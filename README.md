🎮 Tetris TypeScript

Projet final du cours Algorithmie Avancée - Implémentation complète du jeu Tetris.

📋 Table des matières

-Aperçu
-Fonctionnalités
-Technologies utilisées
-Installation
-Utilisation
-Structure du projet
-Contrôles
-Screenshots
-Contribution
-Licence

🎯 Aperçu

Ce projet est une implémentation moderne et complète du classique jeu Tetris, développé en TypeScript dans le cadre d'un cours d'algorithmie avancée. Le jeu inclut toutes les fonctionnalités attendues d'un Tetris moderne avec une interface utilisateur soignée.

✨ Fonctionnalités

-🎲 Jeu Tetris complet avec 7 tétrominos (I, O, T, S, Z, J, L)
-🔄 Rotation des pièces avec détection de collisions intelligente
-🗑️ Suppression des lignes complètes avec animation
-📊 Système de score et niveaux progressifs
-📱 Hold piece - possibilité de garder une pièce en réserve
-🎯 Pièce suivante - aperçu de la prochaine pièce
-💥 Hard drop - chute instantanée des pièces
-🎨 Interface moderne et responsive
-🔊 Effets sonores (optionnel)
-🏆 Système de meilleurs scores

🛠️ Technologies utilisées

-TypeScript - Langage principal
-Vite - Build tool et serveur de développement
-HTML5 Canvas - Rendu graphique
-CSS3 - Styling et animations
-Jest - Tests unitaires
-Node.js - Environnement de développement

📦 Installation

Prérequis

Node.js (version 14 ou supérieure)
npm ou yarn

Étapes

Cloner le repository
git clone https://github.com/votre-username/tetris-ts.git
cd tetris-ts

Installer les dépendances
npm install

Lancer en mode développement
npm run dev

Build pour production
npm run build

🚀 Utilisation

1.Ouvrez votre navigateur et allez sur http://localhost:5173
2.Cliquez sur "Nouvelle Partie" pour commencer
3.Utilisez les contrôles ci-dessous pour jouer

🎮 Contrôles

Touche	Action

⬅️ A / Flèche Gauche	Déplacer à gauche
➡️ D / Flèche Droite	Déplacer à droite
⬇️ S / Flèche Bas	Chute douce
🔄 W / Flèche Haut / Espace	Rotation
💥 Shift	Hard Drop
📦 C	Hold (garder la pièce)
⏸️ P	Pause
🔄 R	Redémarrer

📁 Structure du projet

tetris-ts/
├── src/
│   ├── __tests__/
│   │   ├── grid.test.ts
│   │   └── piece.test.ts
│   ├── constants.ts
│   ├── game.ts
│   ├── grid.ts
│   ├── main.ts
│   ├── piece.ts
│   ├── renderer.ts
│   └── style.css
├── node_modules/
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts

🏗️ Architecture
Le projet suit une architecture modulaire avec séparation des responsabilités :

-main.ts - Point d'entrée principal de l'application
-game.ts - Logique principale du jeu Tetris
-grid.ts - Gestion de la grille de jeu et des collisions
-piece.ts - Logique des tétrominos (formes, rotations)
-renderer.ts - Rendu graphique et affichage
-constants.ts - Constantes du jeu (couleurs, tailles, etc.)
-tests/ - Tests unitaires pour grid et piece

📸 Screenshots
![alt text](<Capture d'écran 2025-10-01 113051.png>)

🧪 Tests

Lancer les tests unitaires :
npm test

Lancer les tests avec couverture :
npm run test:coverage

🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1.Fork le projet
2.Créez une branche pour votre feature (git checkout -b feature/AmazingFeature)
3.Commit vos changements (git commit -m 'Add some AmazingFeature')
4.Push sur la branche (git push origin feature/AmazingFeature)
5.Ouvrez une Pull Request

🐛 Bugs connus

[ ] Parfois les rotations près des bords ne fonctionnent pas parfaitement
[ ] Le score peut avoir un léger délai d'affichage

🗺️ Roadmap

[ ] Mode multijoueur
[ ] Thèmes personnalisables
[ ] Mode sprint (40 lignes)
[ ] Replay des parties
[ ] Leaderboard en ligne

📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

👨‍💻 Auteur

BENBOUZID Mohammed Salah - Salouha123

🙏 Remerciements
-Alexey Pajitnov pour l'invention du Tetris original
-L'équipe pédagogique du cours d'Algorithmie Avancée
-La communauté open source pour les ressources et inspirations


⭐ N'hésitez pas à mettre une étoile si ce projet vous a plu !