describe('Classrooms Page E2E Test', () => {
  const classroomData = {
      name: 'Sala de Teste',
      institutionFk: 'UNIFEI',
  };

  const editedClassroomData = {
      name: 'Sala de Teste Editada',
      institutionFk: 'UNIFEI',
  };

  beforeEach(() => {
      // Navegar para a página de salas
      cy.visit('/classrooms');
  });

  it('should perform CRUD operations on classrooms', () => {
      // Verificar se a página foi carregada corretamente
      cy.contains('Adicionar Sala').should('be.visible');

      // **CREATE**: Adicionar uma nova sala
      cy.contains('Adicionar Sala').click();
      cy.get('input[name="nome"]').type(classroomData.name);
      cy.get('input[name="instituicao"]').type(classroomData.institutionFk);
      cy.contains('Salvar').click();

      // Validar que a sala foi adicionada
      cy.contains(classroomData.name).should('exist');
      cy.contains(classroomData.institutionFk).should('exist');

      // **UPDATE**: Editar a sala criada
      cy.contains(classroomData.name)
          .parent('tr')
          .within(() => {
              cy.get('button[aria-label="editar"]').click();
          });

      cy.get('input[name="nome"]').clear().type(editedClassroomData.name);
      cy.get('input[name="instituicao"]').clear().type(editedClassroomData.institutionFk);
      cy.contains('Salvar').click();

      // Validar que a sala foi editada
      cy.contains(editedClassroomData.name).should('exist');
      cy.contains(editedClassroomData.institutionFk).should('exist');

      // **SEARCH**: Pesquisar a sala editada
      cy.get('input[placeholder="Pesquisar"]').type(editedClassroomData.name);
      cy.contains(editedClassroomData.name).should('exist');
      cy.contains(classroomData.name).should('not.exist'); // Sala antiga não aparece mais

      // **DELETE**: Excluir a sala editada
      cy.contains(editedClassroomData.name)
          .parent('tr')
          .within(() => {
              cy.get('button[aria-label="remover"]').click();
          });

      // Confirmar a exclusão
      cy.contains('Tem certeza que deseja deletar').should('exist');
      cy.contains('Confirmar').click();

      // Validar que a sala foi removida
      cy.contains(editedClassroomData.name).should('not.exist');
  });
});
