---
title: Desarrollo
description: Planteamiento, lógica, decisiones y problemas encontrados.
sidebar:
  order: 2
---

<!-- EDITA: explica la idea en lenguaje natural ANTES de enseñar el código. -->

## Planteamiento

El VFF se basa en una idea en la que el coche se mueve como si sobre él actuaran fuerzas invisibles. El subobjetivo lo atrae, cada obstáculo que detecta el láser lo repele (con más fuerza cuanto más cerca está) y la suma de todas ellas indica hacia dónde ir. Como se recalcula en cada iteración, el coche reacciona a lo que va apareciendo delante sin necesidad de un mapa.

Todas las fuerzas se calculan desde el punto de vista del coche: 'x' hacia delante e 'y' hacia la izquierda. En la interfaz se dibujan con la misma escala, verde para la atracción, roja para la repulsión y negra para la resultante.

<img width="919" height="962" alt="Planteamiento" src="https://github.com/user-attachments/assets/a72f1bea-4b72-4377-8698-a8b010cec0a8" />

*El coche se acerca a un obstáculo situado a su derecha. La atracción (verde) apunta hacia el subobjetivo, la repulsión (roja) lo aparta del obstáculo y la resultante (negra) lo lleva hacia la izquierda para esquivarlo.*

## Lógica y Decisiones

### Fuerza repulsiva

El láser da 180 medidas, una por grado, desde la derecha del coche hasta su izquierda. Cada medida se pasa a un punto (x, y) y genera empuje en dirección contraria al obstáculo, más fuerte cuanto más cerca está. Para calcular el empuje he tomado tres decisiones:
* Solo cuentan los obstáculos a menos de 3,5 metros. Si algo está más lejos no se considera un peligro, así no empuja y el coche sigue recto tranquilamente. Durante las pruebas se observó que cuando el rayo no choca con nada, el láser devuelve una distancia de alrededor de 3,9 metros. Al poner el límite por debajo de ese valor, esas medidas no se confunden con obstáculos reales. Por debajo de 3,5 metros el empuje empieza siendo casi nulo y va creciendo poco a poco a medida que el coche se acerca, sin saltos bruscos.
* Los rayos laterales pesan menos. Un obstáculo justo delante empuja con todo su peso y uno al lado solo con un peso del 30%. Lo peligroso es lo que el coche tiene delante, porque va hacia ello. Lo de los lados, como las vallas, no le molesta mientras vaya recto y si pesara mucho el coche se pondría a oscilar de una valla a otra.
* Se hace la media de todos los rayos. Se suman los empujes de todos los rayos y se divide entre el número de medidas válidas. Así la fuerza no depende de cuántos rayos tenga el láser, sino de lo cerca que estén los obstáculos.

<img width="919" height="962" alt="FuerzaRepulsiva" src="https://github.com/user-attachments/assets/786957e1-e460-46a6-bcf4-c6a8b8e0cc12" />

*Obstáculo delante a la izquierda. Los rayos del láser que chocan con él generan una repulsión (roja) hacia atrás y a la derecha. La resultante (negra) aparta el coche hacia la derecha y, al detectar peligro, la velocidad baja al mínimo.*

### Fuerza atractiva

El subobjetivo viene en coordenadas del circuito, pero las fuerzas se calculan desde el punto de vista del coche. Por ello, primero restamos la posición del coche a la del subobjetivo y después se gira según hacia dónde está mirando el coche. Así averiguamos si el subobjetivo está delante, detrás o a un lado.

La atracción apunta hacia el subobjetivo y su tamaño es siempre el mismo, esté cerca o lejos. En la teoría, la atracción se reduce cerca del destino para que el robot frene y se pare, pero aquí los subobjetivos son puntos de paso intermedios, por lo que el coche no tiene que detenerse en ellos.

El subobjetivo se da por alcanzado cuando el coche está a menos de 2 metros de él, o cuando ya lo ha dejado a un lado o detrás sin llegar a pisarlo. En ese momento pasa al siguiente.

<img width="919" height="962" alt="FuerzaAtractiva" src="https://github.com/user-attachments/assets/d772aa54-a2ce-47c7-bcad-2fdbb9eb4d84" />

*Sin obstáculos cerca, la atracción (verde) apunta al subobjetivo (cruz amarilla) y la resultante (negra) casi coincide con ella.*

### Fuerza resultante

La fuerza resultante es la suma ponderada de la atracción y la repulsión, cada una se multiplica por un peso y luego se suman. La atracción tiene peso 1 y la repulsión peso 3. Como la repulsión sale de hacer la media entre todos los rayos, por sí sola es pequeña y sin ese peso extra los obstáculos apenas contarían frente al subobjetivo.

Además, se crea una memoria local donde la resultante de cada iteración no se usa directamente sino que se mezcla con la de la iteración anterior. El 85% es lo que llevaba y el 15% lo nuevo, así, los cambios bruscos se reparten en varias iteraciones y el ruido del láser no hace dar tirones al coche.

### Traducción a V y W

Calculada la resultante hay que convertirla a la velocidad lineal (V) y a la velocidad angular (W). 

* Velocidad (V): depende del peligro que haya delante, que se mide por cuánto empuja la repulsión hacia atrás. El empuje normal de las vallas se ignora para que el coche no frene en las rectas. Sin peligro va a 3 m/s y cuando aparece un obstáculo va frenando hasta 0,5 m/s. En las curvas también reduce un poco la velocidad pero nunca baja de 0,5 m/s porque entonces no podría girar para apartarse.
* Giro (W): la repulsión casi siempre apunta hacia atrás porque el láser solo ve lo que hay delante. La componente de avance se deja fija y el giro lo decide solo la parte lateral de la resultante, así el ángulo siempre queda entre -90° y +90° y el coche nunca intenta girar hacia atrás. El giro es además proporcional a ese ángulo y está limitado a un máximo para evitar volantazos.

## Dificultades y soluciones

* Al sumar los 180 rayos aunque cada uno empujaba poco el total de la repulsión era mucho mayor que la atracción, así que hice la media entre todos los rayos válidos.
* Frenaba en las curvas sin motivo, porque el láser veía la valla exterior justo delante y el coche frenaba aunque no hubiera ningún obstáculo. Entonces hice que la velocidad dependa solo del peligro delante ignorando el empuje de las vallas.
* Con un obstáculo justo en el centro, si había un coche en plena trayectoria y el subobjetivo detrás, el obstáculo no empujaba hacia ningún lado y el coche iba recto hasta chocar. En ese caso, el coche elige un lado (hacia el que ya apuntaba la resultante, aunque fuera muy poco) y lo mantiene hasta pasar el obstáculo.

<img width="919" height="962" alt="DifSol" src="https://github.com/user-attachments/assets/77f3c46e-98a9-48f9-b2d0-42729fb5f470" />

*Obstáculo justo en la trayectoria, con el subobjetivo detrás. Como ninguna fuerza empuja hacia un lado, el coche elige uno (izquierda) y la resultante (negra) lo aparta del obstáculo.*

* Con un subobjetivo escondido detrás del obstáculo, al esquivarlo por el lado contrario, el coche nunca llegaba a estar cerca del subobjetivo y la atracción lo volvía a meter contra el obstáculo. Entonces lo doy por alcanzado también cuando el coche ya lo ha dejado al lado o detrás.

En cuanto a alguna limitación, debido a la miopía del VFF, el coche solo reacciona a lo que ve en el momento y no planifica por dónde hay más hueco para pasar. Por eso, en algún obstáculo pasa por el lado más estrecho.

<img width="918" height="923" alt="image" src="https://github.com/user-attachments/assets/1ee3da7e-f980-4e9a-bf21-3ce0b46175dd" />
