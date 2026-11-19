---
title: Resumen
description: Objetivo y enunciado.
sidebar:
  order: 1
---

<!-- EDITA: qué se pide y qué conseguiste, en pocas líneas. -->

## Objetivo

El objetivo de esta práctica es programar un coche autónomo que haga de taxi en una ciudad. El coche solo dispone de un mapa de la ciudad y de un GPS que le indica su posición y orientación. Cuando el usuario pincha en un punto del mapa, el taxi debe planificar cómo llegar hasta él por las carreteras y conducir hasta recoger al cliente. Al llegar, esperará un nuevo destino.

Implementaremos el algoritmo Gradient Path Planning (GPP). No se calcula una ruta fija, sino que se calcula un campo sobre el mapa, que será la suma de un subcampo de propagación hacia el destino y otro de penalización por cercanía a los obstáculos. El coche lo utilizará como consulta en cada momento y así podrá saber hacia dónde moverse: es un plan como recurso. A partir del campo, el coche pilotará de forma reactiva, decidiendo en cada iteración su velocidad lineal (V) y angular (W).

## Enunciado

En este apartado podemos comprobar el enunciado de la práctica a realizar:

[Global Navigation using TeleTaxi · Robotics Academy](https://jderobot.github.io/RoboticsAcademy/exercises/AutonomousCars/global_navigation/).


## Ficha de la práctica

| | |
| --- | --- |
| Práctica | P4 · Global Navigation using TeleTaxi |
| Fecha de entrega | 19/11/2026 |
| Lenguaje | Python |
