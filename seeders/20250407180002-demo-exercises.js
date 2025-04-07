// seeders/20250407-seed-exercises.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("exercises", [
      { name: "Agachamento", description: "Exercício para pernas", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Supino reto", description: "Peitoral principal", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Levantamento terra", description: "Trabalho total do corpo", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Puxada frente", description: "Costas com barra na frente", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Remada curvada", description: "Costas com barra", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Rosca direta", description: "Bíceps com barra", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Tríceps testa", description: "Tríceps com barra", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Desenvolvimento ombro", description: "Ombros com barra ou halteres", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Elevação lateral", description: "Ombros laterais com halteres", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Leg press", description: "Pernas em máquina", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Cadeira extensora", description: "Quadríceps isolado", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Cadeira flexora", description: "Posterior de coxa", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Panturrilha sentado", description: "Panturrilha em máquina", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Crucifixo inclinado", description: "Peitoral superior com halteres", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Pullover", description: "Peitoral e costas", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Rosca martelo", description: "Bíceps e antebraço", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Paralelas", description: "Tríceps e peitoral com peso corporal", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Encolhimento com halteres", description: "Trapézio", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Crucifixo inverso", description: "Posterior de ombro", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Stiff", description: "Posterior de coxa com halteres", is_global: true, createdAt: new Date(), updatedAt: new Date() },

      { name: "Abdominal supra", description: "Parte superior do abdômen", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Prancha abdominal", description: "Isometria para core", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Abdominal infra", description: "Parte inferior do abdômen", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Abdominal lateral", description: "Oblíquos", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Corrida na esteira", description: "Cardio", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Bicicleta ergométrica", description: "Cardio leve", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Remada cavalinho", description: "Costas e trapézio", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Crucifixo reto", description: "Peitoral com halteres", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Tríceps corda", description: "Tríceps na polia", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Elevação frontal", description: "Ombro frontal", is_global: true, createdAt: new Date(), updatedAt: new Date() },

      { name: "Rosca scott", description: "Bíceps isolado em banco", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Afundo", description: "Pernas e glúteos", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Barra fixa", description: "Costas e bíceps com peso corporal", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Abdução de quadril", description: "Glúteos com máquina", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Elevação de quadril", description: "Glúteos solo ou máquina", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Remada unilateral", description: "Costas com halteres", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Glúteo com caneleira", description: "Exercício de glúteos com peso", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Cadeira abdutora", description: "Parte externa da coxa", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Cadeira adutora", description: "Parte interna da coxa", is_global: true, createdAt: new Date(), updatedAt: new Date() },
      { name: "Panturrilha em pé", description: "Trabalha panturrilha com peso corporal", is_global: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("exercises", null, {});
  },
};
