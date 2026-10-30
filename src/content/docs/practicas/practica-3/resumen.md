---
title: Resumen
description: Objetivo y enunciado.
sidebar:
  order: 1
---

<!-- EDITA: qué se pide y qué conseguiste, en pocas líneas. -->

## Objetivo

El objetivo de esta práctica es programar un coche de Fórmula 1 para que recorra un circuito con obstáculos en el recorrido sin chocar con ninguno de ellos. El coche cuenta con un sensor láser que ve 180° hacia delante y con su posición en el circuito, además tiene una serie de subobjetivos que marcar en camino a seguir. Lo que no sabe es dónde están los obstáculos hasta que los tiene delante.

Para conseguirlo implementamos el algoritmo de navegación local VFF (Virtual Force Field) donde el subobjetivo atrae al coche, los obstáculos que detecta el láser los repelen y la suma de ambas fuerzas decide en cada iteracción la velocidad lineal (V) y la angular (W). Observaremos el resultado en el simulador de Unibotics, el coche completará la vuelta esquivando todos los obtáculos de forma segura, también los esquivará cuando se cambian de sitio.

## Enunciado

En este apartado podemos comprobar el enunciado de la práctica a realizar:

[Local Navigation With VFF · Robotics Academy](https://jderobot.github.io/RoboticsAcademy/exercises/AutonomousCars/obstacle_avoidance).


## Ficha de la práctica

| | |
| --- | --- |
| Práctica | P3 · Local Navigation With VFF |
| Fecha de entrega | 30/10/2026 |
| Lenguaje | Python |
