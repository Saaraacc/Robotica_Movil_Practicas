---
title: Desarrollo
description: Planteamiento, algoritmo y código de la práctica 3.
sidebar:
  order: 2
---

<!-- EDITA: explica la idea en lenguaje natural ANTES de enseñar el código. -->

## Planteamiento

Describe la estrategia que sigue el robot y por qué la elegiste.

## Algoritmo

Si usas una máquina de estados, enumera cada estado y la condición para pasar al siguiente.

## Código

```python title="main.py" {3-4}
def control_step(sensores):
    if sensores.obstaculo_delante:
        return girar(velocidad=0.5)
    return avanzar(velocidad=0.3)
```

Las líneas resaltadas son la decisión clave. Cambia el rango `{3-4}` para marcar otras.

## Dificultades y soluciones

- Problema encontrado y cómo lo resolviste.
