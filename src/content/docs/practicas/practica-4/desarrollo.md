---
title: Desarrollo
description: Planteamiento, lógica, decisiones y problemas encontrados.
sidebar:
  order: 2
---

<!-- EDITA: explica la idea en lenguaje natural ANTES de enseñar el código. -->

## Planteamiento

La idea del GPP (Gradient Path Planning) es dar a cada celda de un mapa un valor que indica cuánto cuesta llegar desde ella hasta el destino. El destino vale 0 y cuanto más lejos está una celda, mayor es su valor. El coche se mueve siempre hacia las celdas de menor valor, así que se va acercando poco a poco al destino hasta recoger al cliente.

El programa se divide en dos partes. En la parte secuencial se realiza la planificación: cada vez que el usuario elige un destino, se calcula un nuevo campo hacia él, una sola vez por destino. Después, en la parte iterativa se realiza la navegación: en cada iteración, el coche lee su posición del GPS y pide consejo al campo para que le ayude a decidir hacia dónde ir. No sigue ninguna ruta guardada, así que si se desvía, el siguiente consejo se realiza desde su nueva posición.

<img width="715" height="590" alt="planteamiento_2mapas" src="https://github.com/user-attachments/assets/9b2d5621-2801-4f5d-b524-8dd75fe26390" />

*Arriba a la izquierda, el mapa con el taxi (rojo) y el destino (X azul). A la derecha, el campo calculado, con el camino sugerido en verde y el destino marcado con una cruz blanca.*

## Lógica y Decisiones

### Subcampo de propagación

El subcampo de propagación mide la distancia real por carretera desde cada celda hasta el destino. Funciona como una onda que sale del destino y se expande solo por las calles. Cada paso recto cuesta 1 y cada paso en diagonal √2, para que el valor corresponda a la distancia real.

Para expandir la onda he usado una cola de prioridad que siempre procesa primero la celda con menor valor. De esta forma, cada celda guarda la distancia del camino más corto por carretera hasta el destino, y no la distancia en línea recta. Así, el valor de cada celda indica lo que el coche tendría que recorrer realmente para llegar al cliente.

Además, he tomado dos decisiones:
* Parar la onda al llegar al taxi: no hace falta calcular toda la ciudad. Cuando la onda alcanza al taxi, se expande un margen más y se detiene. El margen permite que el coche siga teniendo campo alrededor aunque se desvíe un poco.
* Animar la onda: cada 400 celdas se repinta el campo con una pequeña pausa, para ver cómo crece desde el destino. Es solo visual.

[videoOnda.webm](https://github.com/user-attachments/assets/313649ff-b0a1-4f5e-9fac-e44ca443d6c2)

*La onda de propagación creciendo desde el destino hasta alcanzar al taxi.*

### Subcampo de penalización

Si el coche siguiera solo el subcampo de propagación, iría por el camino más corto, que pasaría rozando las esquinas de los edificios. Para evitarlo, a cada celda se le suma una penalización que depende de lo cerca que esté de una pared.

Para saber esa distancia he usado otra onda, igual que la de propagación, pero que sale de todos los edificios a la vez. Después la distancia se convierte en penalización:
* Valor máximo de 20 en las celdas pegadas a una pared y 0 a partir de 6 celdas (7,5 metros).
* Forma cuadrática: la penalización es casi plana en el centro de la calle y crece muy rápido cerca de las paredes. Así, cambia poco donde circula el coche y se reducen los mínimos locales, es decir, puntos donde el coche quedaría atascado porque todas las celdas de alrededor tienen un valor mayor sin haber llegado al destino.

Como la penalización solo depende del mapa, que no cambia, se calcula una única vez al arrancar el programa y se reutiliza para todos los destinos.

<img width="765" height="960" alt="SubcampoPenalizacion" src="https://github.com/user-attachments/assets/e7019842-b53e-48c2-94e5-97eb8e009ae2" />

*Subcampo de penalización: los bordes de las calles, cerca de las paredes, en tonos claros y el centro en oscuro.*

### Campo final

El campo final es la suma de los dos subcampos. Sin embargo, la penalización disminuye cerca del destino: se multiplica por un factor que vale 0 en el destino y aumenta hasta 1 a partir de 6 celdas. Sin esta atenuación, si el cliente estaba junto a una pared, la penalización hacía que alguna celda cercana valiera menos que el propio destino, y el coche se quedaba ahí sin llegar. Con ella, el destino vale exactamente 0 y es siempre el punto más bajo del campo.

Para visualizarlo, el campo guarda sus valores reales y solo se convierte a escala de grises para pintarlo: de gris oscuro cerca del destino a blanco lejos de él, dejando el negro para los edificios y las zonas que no se han calculado. Encima se marca el destino con una cruz blanca y se dibuja en verde el camino que sugiere el campo.

### Navegación: mirar de cerca

En cada iteración, el coche busca la celda de menos valor dentro de un círculo de 6 celdas a su alrededor y se dirige hacia ella. Al principio solo miraba los 8 vecinos inmediatos, pero cualquier pequeño mínimo local del campo lo dejaba atascado. Mirando más lejos, el coche ve más allá de esos mínimos y además conduce de forma más suave.

La celda elegida tiene que ser alcanzable en línea recta: la línea no puede atravesar ningún edificio ni pasar a menos de 2,5 celdas (unos 3 metros) de una pared. El coche se trata como un punto, así que ese margen compensa su anchura. Hay dos excepciones:
* Cerca del cliente se permite arrimarse a la acera, para poder recogerlo aunque esté junto a una pared.
* Si el coche ya está cerca de una pared, solo puede ir hacia zonas igual o más alejadas de ella, para que nunca se quede bloqueado.

### Máquina de estados y control de V y W

El taxi funciona con dos estados:
* ESPERANDO: está parado hasta que el usuario pinche un destino válido. Si el punto elegido es un edificio, se muestra un aviso y el taxi no se mueve.
* NAVEGANDO: en cada iteración comprueba si ha llegado al cliente (a menos de 3,75 metros). Si no, pide consejo al campo y calcula sus velocidades. Al llegar, se para y vuelve a ESPERANDO. Si se elige otro destino a mitad de camino, se replanifica y va hacia el nuevo.

Las velocidades se calculan a partir del error de orientación, es decir, la diferencia entre la dirección hacia la celda objetivo y la dirección hacia la que mira el coche:
* W es proporcional a ese error con una ganancia de 1,5 y está limitada a 3,5 rad/s para evitar giros bruscos.
* V es máxima en las rectas (10 m/s) y se reduce con el cuadrado del coseno del error, para frenar con fuerza en las curvas. Además, se limita al acercarse al cliente para no pasarse.

Como medida de seguridad, si el coche saliera de la zona calculada del campo o no recibiera ningún consejo, se replanifica desde su posición actual.

## Dificultades y soluciones

* Índices invertidos, porque la conversión entre metros y celdas de la interfaz devuelve los índices al revés (columna, fila). Para solucionarlo, creé una función propia que les da la vuelta (a_celda).
* Mínimos locales junto al destino, al seleccionar un destino junto a una pared, la penalización hacía que la celda de al lado valiera menos que el propio destino. Lo solucioné disminuyendo la penalización cerca del destino.
* Mínimos locales en el camino, mirando solo los 8 vecinos, el coche se atascaba al entrar en algunas calles estrechas. Lo solucioné haciendo que mirase en un círculo de 6 celdas.
* Riesgo de rozar esquinas, la comprobación de la línea recta trataba al coche como un punto, así que podía pasar pegado a una esquina. Lo solucioné exigiendo un margen de 2,5 celdas a las paredes.
* El camino anterior no se borraba, al elegir un nuevo destino, el camino verde anterior seguía en la pantalla mientras se calculaba el nuevo. Lo solucioné enviando un camino de longitud cero en la posición del taxi.

La principal limitación de este método es que planifica sobre un mapa fijo, por tanto, no tendría en cuenta un obstáculo que no aparezca en él como por ejemplo un coche parado en mitad de la calle. Además, su precisión está limitada por el tamaño de las celdas del mapa (1,25 metros).
