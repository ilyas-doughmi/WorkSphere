# WorkSphere – Virtual Workspace Manager

WorkSphere est une application web interactive permettant de gérer et d’organiser la répartition du personnel dans un espace de travail virtuel. Elle offre une visualisation claire des zones d’un bâtiment et permet d’assigner les employés selon des règles métier strictes.

---

## Fonctionnalités

### Gestion du personnel

* Ajouter de nouveaux employés.

### Carte interactive

* Visualisation de 6 zones :

  * Salle de conférence
  * Réception
  * Salle des serveurs
  * Salle de sécurité
  * Salle du personnel
  * Archives

### Règles métier

* Les employés ne peuvent accéder qu’aux zones autorisées selon leur rôle.
* Les Managers et l'équipe de Nettoyage disposent d’un accès élargi.
* Les salles critiques apparaissent en rouge lorsqu’elles sont vides.
* Chaque salle possède une capacité maximale configurable.

### Persistance des données

* Les informations sont automatiquement sauvegardées dans le LocalStorage.
* Les données sont restaurées à chaque ouverture de l’application.

---

## Technologies utilisées

* **HTML5** : Structure sémantique de l’application.
* **Tailwind CSS** : Design moderne, responsive et basé sur un système utility-first.
* **JavaScript ES6+** : Logique métier, gestion des événements et modules JS.
* **LocalStorage** : Sauvegarde persistante côté navigateur.

---

## Installation et lancement

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/ilyas-doughmi/worksphere.git
   ```

2. Ouvrez simplement le fichier `index.html` avec votre navigateur.

Aucune installation supplémentaire n’est requise.
Tailwind CSS est chargé via CDN pour simplifier l’usage durant ce prototype.

---

## Structure du projet

```
WorkSphere/
├── index.html              # Point d’entrée principal
├── readme.md               # Documentation
├── style/
│   ├── app.css             # Styles globaux
│   └── tailwind.css        # Configuration Tailwind
├── script/
│   ├── script.js           # Logique principale (DOM, événements)
│   └── modules/
│       ├── localstorage.js # Gestion LocalStorage
│       └── validator.js    # Validation des formulaires
└── media/
    └── plan.jpg            # Illustration du plan d'étage
```

---

## Choix de conception

### Architecture modulaire

Le code JavaScript est organisé sous forme de modules afin de séparer la logique métier, la gestion du stockage et la validation.

### Responsive Design

L’interface adopte une approche mobile-first et s’adapte aux différentes tailles d’écran grâce aux utilitaires Tailwind CSS.

### Expérience utilisateur

Les interactions se font via des modales afin d'éviter les rechargements de page. Cela améliore la fluidité et la vitesse d’utilisation.

---

## Auteur

Projet réalisé dans le cadre de la formation Développeur Web.
