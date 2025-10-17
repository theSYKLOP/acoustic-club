# 📖 Guide Utilisateur - Acoustic Club

**Version** : 1.0  
**Date** : 17 Octobre 2025  
**Application** : Système de Gestion de Restaurant

---

## 🎯 Bienvenue sur Acoustic Club

Acoustic Club est une plateforme de gestion de restaurant moderne qui permet de gérer les tables, les commandes, le menu et les utilisateurs de manière intuitive et efficace.

---

## 🔐 Comptes de Test Disponibles

Pour tester l'application, vous pouvez utiliser les comptes suivants :

### 👑 Compte Administrateur
- **Email** : `admin@acoustic-club.com`
- **Mot de passe** : `password123`
- **Accès** : Toutes les fonctionnalités (gestion complète)

### 👨‍💼 Compte Serveur
- **Email** : `serveur@acoustic-club.com`
- **Mot de passe** : `password123`
- **Accès** : Gestion des tables et commandes

### 👤 Compte Client Standard
- **Email** : `client@acoustic-club.com`
- **Mot de passe** : `password123`
- **Accès** : Consultation et commandes

### ⭐ Compte Client Premium
- **Email** : `premium@acoustic-club.com`
- **Mot de passe** : `password123`
- **Accès** : Client avec avantages (15% réduction, 500 points)

---

## 🚀 Démarrage Rapide

### 1. **Connexion**
1. Accédez à la page d'accueil
2. Cliquez sur **"Connexion"** en haut à droite
3. Entrez vos identifiants (voir ci-dessus)
4. Cliquez sur **"Se connecter"**

### 2. **Première Navigation**
Une fois connecté, vous serez redirigé vers votre **Dashboard** personnalisé selon votre rôle.

---

## 📱 Interfaces Disponibles

### 🏠 Dashboard Principal
**Accessible par** : Tous les utilisateurs connectés

**Fonctionnalités** :
- 📊 **Statistiques en temps réel**
  - Tables occupées
  - Commandes actives
  - Commandes du jour
  - Menus disponibles

- 🧭 **Navigation rapide**
  - Accès aux différentes sections
  - Liens vers les fonctionnalités principales

- 📱 **Design responsive**
  - Adapté mobile, tablette et desktop
  - Interface tactile optimisée

---

### 👑 Interface Administrateur (`/admin`)
**Accessible par** : Admin uniquement

#### 📊 Dashboard Admin
- Vue d'ensemble du système
- **4 cartes statistiques** :
  - 🪑 Tables totales + taux d'occupation
  - 📋 Commandes actives
  - 🍽️ Items disponibles au menu
  - 💰 Chiffre d'affaires total

- **Actions rapides** :
  - Gérer les tables
  - Gérer le menu
  - Voir les commandes
  - Gérer les utilisateurs
  - Consulter les statistiques
  - Retour dashboard client

#### 🪑 Gestion des Tables (`/admin/tables`)

**Fonctionnalités** :
- ✅ **Créer une nouvelle table**
  - Numéro de table (unique)
  - Capacité (1-20 personnes)
  - Zone/Emplacement (Intérieur, Terrasse, VIP)
  - QR Code généré automatiquement

- ✅ **Voir les détails d'une table**
  - Toutes les informations
  - QR Code pour scanner
  - Statut actuel
  - Historique

- ✅ **Modifier une table**
  - Changer le numéro
  - Modifier la capacité
  - Changer la localisation
  - Modifier le statut

- ✅ **Changer le statut rapidement**
  - 🟢 **Libre** : Table disponible
  - 🔴 **Occupée** : Client installé
  - 🟡 **Réservée** : Réservation en cours
  - ⚫ **Hors service** : Maintenance

- ✅ **Supprimer une table**
  - Confirmation avant suppression
  - Suppression sécurisée

**Vue Mobile** :
- Cartes tactiles faciles à manipuler
- Actions rapides (modifier, supprimer)
- Liste scrollable

**Vue Desktop** :
- Tableau complet avec toutes les colonnes
- Actions inline
- Tri et filtrage

#### 🍽️ Gestion du Menu (`/admin/menus`)
*À venir dans la prochaine version*

Fonctionnalités prévues :
- Ajouter des plats
- Modifier les prix
- Gérer la disponibilité
- Catégories (Entrée, Plat, Dessert, Boisson, etc.)

#### 📋 Gestion des Commandes (`/admin/orders`)
*À venir dans la prochaine version*

Fonctionnalités prévues :
- Voir toutes les commandes
- Filtrer par statut
- Statistiques détaillées
- Export des données

#### 👥 Gestion des Utilisateurs (`/admin/users`)
*À venir dans la prochaine version*

Fonctionnalités prévues :
- Créer des comptes
- Modifier les rôles
- Gérer les permissions
- Clients premium

#### 📈 Statistiques (`/admin/stats`)
*À venir dans la prochaine version*

Fonctionnalités prévues :
- Graphiques de vente
- Analyses de performance
- Rapports personnalisés
- Export PDF

---

### 👨‍💼 Interface Serveur (`/serveur`)
**Accessible par** : Serveur et Admin

#### 📊 Dashboard Serveur

**Statistiques rapides** :
- 🪑 **Tables libres** : Nombre de tables disponibles
- 📋 **Commandes en attente** : À traiter
- ✅ **Commandes du jour** : Total journalier

**État des Tables** :
- Grille visuelle de toutes les tables
- Code couleur par statut :
  - 🟢 Vert : Libre
  - 🔴 Rouge : Occupée
  - 🟡 Orange : Réservée
  - ⚫ Gris : Hors service
- Click sur une table pour voir les détails
- Capacité et emplacement affichés

**Commandes Actives** :
- Liste de toutes les commandes en cours
- Informations visibles :
  - Numéro de commande
  - Table assignée
  - Heure de commande
  - Montant total
  - Statut actuel

**Actions disponibles** :
- ⏳ **En attente** → **En préparation**
- 🔄 **En préparation** → **Prêt**
- ✅ **Prêt** → **Servi**
- 💰 **Servi** → **Payé**

**Design responsive** :
- Mobile : Grille 1-2 colonnes
- Tablette : Grille 2-3 colonnes
- Desktop : Grille 4 colonnes

---

### 🪑 Gestion des Tables (`/tables`)
**Accessible par** : Tous les utilisateurs connectés

**Fonctionnalités** :
- 📋 **Vue d'ensemble** de toutes les tables
- 🔍 **Filtres par statut** :
  - Toutes
  - Libres
  - Occupées
  - Réservées
- 📱 **Grille responsive** (1→2→3→4→5 colonnes)
- 👆 **Click sur une table** pour voir les détails
- 📊 **Statistiques** :
  - Total de tables
  - Taux d'occupation
  - Tables libres/occupées

**Informations par table** :
- Numéro
- Capacité
- Emplacement
- Statut avec badge coloré
- QR Code (si disponible)

---

## 🎨 Fonctionnalités Générales

### 🔐 Authentification
- ✅ **Connexion sécurisée** avec JWT
- ✅ **Session persistante** (localStorage)
- ✅ **Déconnexion propre**
- ✅ **Protection des routes** par rôle
- ✅ **Initialisation automatique** au chargement

### 📱 Responsive Design
- ✅ **Mobile-first** : Optimisé pour smartphone
- ✅ **Tablette** : Layout adapté
- ✅ **Desktop** : Interface complète
- ✅ **Touch-friendly** : Boutons tactiles 44px min
- ✅ **Hamburger menu** : Navigation mobile
- ✅ **Sidebar responsive** : Admin layout

### 🎭 Modals Optimisés
- ✅ **BaseModal** : Modal de base réutilisable
- ✅ **TableModal** : CRUD unifié (Créer/Voir/Modifier)
- ✅ **ConfirmModal** : Confirmations sécurisées
- ✅ **Animations fluides** : Slide-up mobile, zoom desktop
- ✅ **Fermeture ESC** : Clavier supporté
- ✅ **Click backdrop** : Fermeture intuitive

### 🎯 UX/UI Amélioré
- ✅ **Design moderne** : Tailwind CSS
- ✅ **Couleurs cohérentes** : Palette indigo/violet
- ✅ **Badges colorés** : Statuts visuels
- ✅ **Hover effects** : Feedback visuel
- ✅ **Loading states** : Spinners durant chargement
- ✅ **Empty states** : Messages si aucune donnée
- ✅ **Error handling** : Gestion d'erreurs claire

---

## 📊 Données de Test Préchargées

### 🪑 Tables (20 tables)
- **Tables 1-8** : Intérieur, 4 personnes
- **Tables 9-15** : Terrasse, 6 personnes
- **Tables 16-20** : VIP, 8 personnes

**Statuts** :
- Tables 1-5 : Occupées
- Tables 6-15 : Libres
- Tables 16-20 : Réservées

### 🍽️ Menu (24 items)

#### Entrées (4)
1. **Salade César** - 12,50€
   - Salade romaine, poulet grillé, parmesan, croûtons
   - Temps : 10 min

2. **Soupe à l'oignon** - 9,00€
   - Soupe gratinée maison
   - Temps : 15 min

3. **Carpaccio de bœuf** - 14,00€
   - Fines tranches de bœuf, roquette, parmesan
   - Temps : 8 min

4. **Velouté de potiron** - 8,50€
   - Crème fraîche, croûtons
   - Temps : 12 min

#### Plats (6)
1. **Burger Acoustic** - 18,50€
   - Pain maison, steak 180g, cheddar, bacon, frites
   - Temps : 20 min

2. **Pavé de saumon** - 22,00€
   - Saumon grillé, légumes de saison, riz
   - Temps : 25 min

3. **Entrecôte grillée** - 26,50€
   - Entrecôte 300g, frites maison, sauce au poivre
   - Temps : 25 min

4. **Risotto aux champignons** - 17,00€
   - Risotto crémeux, champignons frais, parmesan
   - Temps : 22 min

5. **Fish & Chips** - 16,50€
   - Cabillaud pané, frites, sauce tartare
   - Temps : 18 min

6. **Pâtes carbonara** - 15,00€
   - Pâtes fraîches, lardons, crème, parmesan
   - Temps : 15 min

#### Desserts (4)
1. **Tiramisu maison** - 8,00€
   - Mascarpone, café, cacao
   - Temps : 5 min

2. **Tarte citron meringuée** - 7,50€
   - Tarte fraîche du jour
   - Temps : 5 min

3. **Fondant au chocolat** - 9,00€
   - Cœur coulant, glace vanille
   - Temps : 12 min

4. **Salade de fruits frais** - 6,50€
   - Fruits de saison
   - Temps : 5 min

#### Boissons & Alcools (10)
**Boissons** :
- Coca-Cola (33cl) - 4,00€
- Perrier (33cl) - 4,50€
- Jus d'orange pressé - 5,50€
- Café expresso - 2,50€

**Alcools** :
- Bière pression (50cl) - 6,50€
- Vin rouge (verre) - 7,00€
- Vin blanc (verre) - 7,00€

**Cocktails** :
- Mojito - 10,00€
- Piña Colada - 11,00€
- Cosmopolitan - 12,00€

### 📋 Commandes Exemple (2)

**Commande 1** :
- Client : Marie Client
- Table : Table 1
- Statut : En préparation
- Items :
  - 2x Burger Acoustic (37,00€)
  - 2x Coca-Cola (8,00€)
- **Total** : 45,00€

**Commande 2** :
- Client : Pierre Premium (réduction 15%)
- Table : Table 2
- Statut : Payé
- Items :
  - 1x Pavé de saumon (22,00€)
  - 1x Vin blanc (7,00€)
  - 1x Tiramisu maison (8,00€)
- **Total** : 37,00€

---

## 🔄 Flux de Travail Typique

### Pour un Administrateur 👑

1. **Connexion** avec `admin@acoustic-club.com`
2. Accès au **Dashboard Admin** (`/admin`)
3. **Voir les statistiques** globales
4. **Gérer les tables** :
   - Créer une nouvelle table
   - Modifier une table existante
   - Changer les statuts
   - Supprimer une table
5. **Consulter les commandes**
6. **Gérer le menu** (à venir)
7. **Déconnexion**

### Pour un Serveur 👨‍💼

1. **Connexion** avec `serveur@acoustic-club.com`
2. Accès à **l'interface serveur** (`/serveur`)
3. **Consulter l'état des tables**
4. **Gérer les commandes** :
   - Voir les commandes en attente
   - Mettre en préparation
   - Marquer comme prêt
   - Marquer comme servi
   - Marquer comme payé
5. **Assigner des tables** aux clients
6. **Déconnexion**

### Pour un Client 👤

1. **Connexion** avec `client@acoustic-club.com`
2. Accès au **Dashboard**
3. **Voir les tables disponibles** (`/tables`)
4. **Consulter ses commandes**
5. **Scanner le QR Code** d'une table
6. **Passer commande** (à venir)
7. **Déconnexion**

### Pour un Client Premium ⭐

Mêmes fonctionnalités que le client standard, plus :
- **15% de réduction** automatique
- **500 points** fidélité
- **Badge Gold** visible
- **Avantages exclusifs** (à venir)

---

## 🎨 Guide de Navigation

### Navigation Principale

**Header** (toujours visible) :
- Logo Acoustic Club (retour accueil)
- Liens de navigation selon le rôle :
  - Dashboard
  - Service (si Serveur/Admin)
  - Admin (si Admin)
  - Tables
- Menu utilisateur :
  - Nom + Rôle
  - Déconnexion

**Menu Mobile** (< 1024px) :
- Hamburger menu (☰)
- Navigation slide-in
- Overlay backdrop
- Fermeture automatique

### Raccourcis Clavier

- `Échap` : Fermer les modals
- `Entrée` : Valider les formulaires

---

## 🛠️ Fonctionnalités Techniques

### Sécurité 🔐
- ✅ JWT (JSON Web Tokens)
- ✅ Hashage bcrypt (12 rounds)
- ✅ Protection CSRF
- ✅ Validation côté serveur
- ✅ Middlewares de protection

### Performance ⚡
- ✅ Lazy loading des modals
- ✅ Optimisation Tailwind (purge CSS)
- ✅ Cache localStorage intelligent
- ✅ Transitions GPU-accelerated
- ✅ Code splitting automatique

### Base de Données 🗄️
- ✅ PostgreSQL avec Prisma ORM
- ✅ Migrations automatiques
- ✅ Seed data pour tests
- ✅ Relations optimisées

---

## 📱 Compatibilité

### Navigateurs Supportés ✅
- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS/macOS)
- ✅ Chrome Mobile (Android)

### Appareils Testés ✅
- ✅ iPhone SE (320px)
- ✅ iPhone 12/13 (375px)
- ✅ iPad (768px)
- ✅ iPad Pro (1024px)
- ✅ Desktop (1280px+)

---

## 🐛 Signalement de Bugs

Si vous rencontrez un problème :

1. **Vérifiez** que vous utilisez un compte de test valide
2. **Actualisez** la page (F5 ou Ctrl+R)
3. **Videz le cache** si nécessaire
4. **Vérifiez la console** (F12) pour les erreurs
5. **Notez** les étapes pour reproduire le bug
6. **Contactez** l'équipe de développement

---

## 💡 Conseils d'Utilisation

### Pour une meilleure expérience :

✅ **Utilisez Chrome** pour les meilleures performances
✅ **Activez JavaScript** (obligatoire)
✅ **Autorisez les cookies** pour la session
✅ **Utilisez HTTPS** en production
✅ **Testez sur mobile** pour voir le responsive
✅ **Explorez les modals** pour les fonctionnalités CRUD
✅ **Vérifiez les animations** sur desktop
✅ **Testez le menu hamburger** sur mobile

---

## 📋 Statuts Disponibles

### Tables 🪑
- 🟢 **LIBRE** : Disponible pour attribution
- 🔴 **OCCUPEE** : Client installé
- 🟡 **RESERVEE** : Réservation confirmée
- ⚫ **HORS_SERVICE** : Maintenance/nettoyage

### Commandes 📋
- 🟡 **EN_ATTENTE** : Commande reçue
- 🔵 **EN_PREPARATION** : En cuisine
- 🟣 **PRET** : Prêt à servir
- 🟢 **SERVI** : Servi au client
- ❌ **ANNULE** : Annulé
- 💰 **PAYE** : Payé et terminé

### Utilisateurs 👥
- 👤 **CLIENT** : Client standard
- ⭐ **PREMIUM** : Client privilégié
- 👨‍💼 **SERVEUR** : Personnel de service
- 👑 **ADMIN** : Administrateur complet

---

## 🎓 Tutoriels Vidéo

*À venir* :
- 📹 Comment créer une table
- 📹 Comment gérer une commande
- 📹 Comment utiliser les modals
- 📹 Navigation mobile

---

## 📞 Support

**Email** : support@acoustic-club.com  
**Téléphone** : +33 1 23 45 67 89  
**Horaires** : Lun-Ven 9h-18h

---

## 📄 Mentions Légales

**Application** : Acoustic Club  
**Version** : 1.0  
**Dernière mise à jour** : 17 Octobre 2025  
**Technologie** : Nuxt 3, Vue 3, TypeScript, Prisma, PostgreSQL  
**Licence** : Propriétaire

---

## 🚀 Roadmap (Prochaines Fonctionnalités)

### Version 1.1 (Q4 2025)
- [ ] Gestion complète du menu (CRUD)
- [ ] Gestion des utilisateurs
- [ ] Paiements intégrés
- [ ] Statistiques avancées
- [ ] Export PDF des commandes

### Version 1.2 (Q1 2026)
- [ ] Application mobile (iOS/Android)
- [ ] QR Code scanner intégré
- [ ] Push notifications
- [ ] Mode hors-ligne (PWA)
- [ ] Dark mode

### Version 2.0 (Q2 2026)
- [ ] Intelligence artificielle (prédictions)
- [ ] Programme fidélité avancé
- [ ] Multi-restaurants
- [ ] API publique
- [ ] Intégrations tierces

---

**Merci d'utiliser Acoustic Club ! 🎵**

Pour toute question, n'hésitez pas à contacter le support.

**Bonne découverte de l'application ! ✨**
