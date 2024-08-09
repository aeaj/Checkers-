# Damspil med Minimax og Alpha-Beta Pruning

![Checkers Game](Img/Checkers.img.png)

## Link til deployet udgave
[Checkers Game](https://aeaj.github.io/Checkers-/)

## Kort beskrivelse

Dette er et damespil implementeret med Model-View-Controller (MVC) mønsteret. Spillet inkluderer en AI-modstander, som bruger Minimax-algoritmen med Alpha-Beta Pruning til beslutningstagning.

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

- Player 1: Human player
- Player 2: AI opponent using Minimax with Alpha-Beta Pruning
- Standard checkers rules, with no mandatory jumps, king promotion, and 1 jump at a time.


