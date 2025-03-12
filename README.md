# Damspil med Minimax og Alpha-Beta Pruning

![Checkers Game](Img/Checkers.img.png)

## Link til deployet udgave
[Checkers Game](https://aeaj.github.io/Checkers-/)

## Kort beskrivelse

Damspil implementeret med Model-View-Controller (MVC) mønsteret. Spillet inkluderer en AI-modstander, som bruger Minimax-algoritmen med Alpha-Beta Pruning til beslutningstagning.

## Algoritmer og datastrukturer

### Minimax og Alpha-Beta Pruning
Minimax-algoritmen bruges til at finde det bedste træk ved at simulere alle mulige træk fremad i spillet og evaluere dem. Alpha-Beta Pruning forbedre Minimax ved at sortere unødvendige træk fra, som ikke vil påvirke den endelige beslutning, hvilket gør algoritmen mere effektiv.

### Datastrukturer
- **Board**: Repræsenteret som et 2D-array, hvor hvert element kan være en brik tilhørende:
  Spiller 1 (1), 
  Spiller 2 (2), 
  Kongebrik for spiller 1 (3),
  Kongebrik for spiller 2 (4),
  Eller et tomt felt (0).

## Spil spillet ved at trykke på på den deployed udgave

## Features

- Spiller 1: Menneskelig spiller
- Spiller 2: AI Modstander bruger Minimax med Alpha-Beta Pruning
- Standard Dam regler, med ingen obligatorisk hop og kun 1 hop af gangen.

