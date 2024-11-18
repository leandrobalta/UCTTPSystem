describe('Professors Page', () => {
  beforeEach(() => {
    // Visita a página de professores
    cy.visit('/professors');
  });

  it('should load and display a list of professors', () => {
    // Verifica se a tabela está presente
    cy.get('table').should('exist');

    // Verifica se há linhas na tabela (exceto o cabeçalho)
    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0) // Deve haver pelo menos uma linha
      .each(($row) => {
        // Verifica se as células têm dados válidos
        cy.wrap($row).within(() => {
          cy.get('td').eq(0).invoke('text').should('not.be.empty'); // Matrícula numérica
          cy.get('td').eq(1).invoke('text').should('not.be.empty'); // Nome
          cy.get('td').eq(2).invoke('text').should('include', '@'); // Email contém "@"
        });
      });
  });

  it('should allow searching for professors by name, registration, or email', () => {
    const searchTerm = 'Dr. João'; // Ajuste o termo de busca para dados esperados

    // Insere o termo de busca
    cy.get('input').type(searchTerm);

    // Verifica se apenas as linhas correspondentes são exibidas
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td').invoke('text').should('contain', searchTerm);
      });
    });
  });

  it('should open the add professor dialog and close it', () => {
    // Clica no botão para adicionar um professor
    cy.contains('Adicionar Professor').click();

    // Verifica se o diálogo abriu
    cy.get('.MuiDialog-root').should('exist');

    // Fecha o diálogo
    cy.contains('Cancelar').click();

    // Verifica se o diálogo foi fechado
    cy.get('.MuiDialog-root').should('not.exist');
  });
  
    it('should add, edit, and remove a professor', () => {
      const newProfessor = {
        registration: 'P004',
        name: 'Dr. Teste da Silva',
        email: 'teste.silva@example.com',
        phone: '123456789',
        institution: 'UNIFEI',
        degree: 'Mestre'
      };
  
      const updatedProfessor = {
        name: 'Dr. Teste Silva Editado',
        email: 'teste.silva.edited@example.com',
      };
  
      // Adicionar professor
      cy.contains('Adicionar Professor').click();
      cy.get('input[name="registration"]').type(newProfessor.registration);
      cy.get('input[name="name"]').type(newProfessor.name);
      cy.get('input[name="email"]').type(newProfessor.email);
      cy.get('input[name="phone"]').type(newProfessor.phone);
      cy.get('input[name="institution"]').type(newProfessor.institution);

      cy.get('#degree').click(); 
      cy.contains('Mestre').click(); 

      cy.contains('Salvar').click();
  
      // Verifica se o professor foi adicionado
      cy.get('table tbody tr').last().within(() => {
        cy.get('td').eq(0).should('have.text', newProfessor.registration); // Matrícula
        cy.get('td').eq(1).should('have.text', newProfessor.name); // Nome
        cy.get('td').eq(2).should('have.text', newProfessor.email); // Email
      });
  
      // Editar professor
      cy.get('table tbody tr').last().within(() => {
        cy.get('button[aria-label="editar"]')  // Se o ícone de editar tiver esse atributo
          .click();
      });
      
      cy.get('input[name="name"]').clear().type(updatedProfessor.name);
      cy.get('input[name="email"]').clear().type(updatedProfessor.email);
      cy.contains('Salvar').click();
  
      // Verifica se o professor foi editado
      cy.get('table tbody tr').last().within(() => {
        cy.get('td').eq(1).should('have.text', updatedProfessor.name); // Nome editado
        cy.get('td').eq(2).should('have.text', updatedProfessor.email); // Email editado
      });
  
      cy.get('table tbody tr').last().within(() => {
        cy.get('button[aria-label="remover"]') // Se o ícone de remover tiver esse atributo
          .click();
      });
  
      // Confirma a remoção
      cy.contains('Confirmar').click();

      cy.wait(1000);
  
      // Verifica se o professor foi removido
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).within(() => {
          cy.get('td').eq(0).should('not.have.text', newProfessor.registration);
          cy.get('td').eq(1).should('not.have.text', updatedProfessor.name);
          cy.get('td').eq(2).should('not.have.text', updatedProfessor.email);
        });
      });
    });
  });  