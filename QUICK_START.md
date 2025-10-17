# 🚀 Quick Start - Acoustic Club

Guide de démarrage rapide pour tester l'application immédiatement.

---

## 🔐 Identifiants de Test

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------------|-------|
| 👑 **Admin** | `admin@acoustic-club.com` | `password123` | Accès complet |
| 👨‍💼 **Serveur** | `serveur@acoustic-club.com` | `password123` | Tables + Commandes |
| 👤 **Client** | `client@acoustic-club.com` | `password123` | Consultation |
| ⭐ **Premium** | `premium@acoustic-club.com` | `password123` | Client VIP (15% off) |

---

## ⚡ Test en 3 Minutes

### 1️⃣ Tester en tant qu'Admin (2 min)

```bash
1. Connectez-vous avec : admin@acoustic-club.com / password123
2. Vous êtes sur /admin - Voyez les 4 statistiques
3. Cliquez sur "Gérer les tables"
4. Cliquez sur "Nouvelle table"
5. Remplissez :
   - Numéro : 21
   - Capacité : 4
   - Zone : Terrasse
6. Cliquez "Créer" ✅
7. Cliquez sur la nouvelle table pour voir les détails
8. Testez "Modifier" puis changez le statut en "Occupée"
9. Testez "Supprimer" avec confirmation
```

### 2️⃣ Tester en tant que Serveur (1 min)

```bash
1. Déconnectez-vous (bouton en haut à droite)
2. Reconnectez-vous avec : serveur@acoustic-club.com / password123
3. Vous êtes sur /serveur
4. Voyez l'état de toutes les tables (code couleur)
5. Cliquez sur une table verte (libre)
6. Voyez les commandes actives en bas
7. Testez les boutons de changement de statut
```

### 3️⃣ Tester sur Mobile (30 sec)

```bash
1. Ouvrez les DevTools (F12)
2. Activez le mode responsive (Ctrl+Shift+M)
3. Choisissez "iPhone 12 Pro"
4. Cliquez sur le hamburger menu (☰) en haut à gauche
5. Navigez dans le menu
6. Testez les cartes tactiles
7. Ouvrez un modal (créer/modifier)
8. Voyez l'animation slide-up
```

---

## 📱 URLs Principales

| Page | URL | Accessible par |
|------|-----|----------------|
| Accueil | `/` | Tous |
| Connexion | `/login` | Non connectés |
| Dashboard | `/dashboard` | Connectés |
| Tables | `/tables` | Connectés |
| Admin Dashboard | `/admin` | Admin |
| Admin Tables | `/admin/tables` | Admin |
| Serveur | `/serveur` | Serveur + Admin |

---

## 🎯 Fonctionnalités à Tester

### ✅ Authentification
- [x] Connexion avec localStorage
- [x] Session persistante (rechargez la page)
- [x] Déconnexion propre
- [x] Protection des routes

### ✅ Responsive Design
- [x] Mobile (< 640px) : Menu hamburger
- [x] Tablet (768px) : Layout adapté
- [x] Desktop (1280px) : Interface complète

### ✅ Gestion Tables (Admin)
- [x] Créer une table
- [x] Voir détails (modal)
- [x] Modifier (modal en mode édition)
- [x] Changer statut rapidement
- [x] Supprimer (confirmation)

### ✅ Interface Serveur
- [x] Vue d'ensemble tables
- [x] Stats rapides
- [x] Gestion commandes
- [x] Changement de statut

### ✅ Modals
- [x] TableModal 3-en-1 (view/edit/create)
- [x] ConfirmModal (suppression)
- [x] Fermeture ESC
- [x] Fermeture backdrop
- [x] Animations fluides

---

## 🎨 Test Visuel Rapide

### Desktop (recommandé : 1280px+)
```
✅ Header avec logo + navigation
✅ Sidebar admin (fixe à gauche)
✅ Stats cards en grille 4 colonnes
✅ Tableau des tables avec hover
✅ Modals centrés avec zoom
✅ Boutons avec hover effects
```

### Mobile (recommandé : 375px)
```
✅ Header compact avec hamburger
✅ Sidebar slide-in animée
✅ Stats cards empilées (1-2 colonnes)
✅ Cartes tactiles au lieu de tableau
✅ Modals plein écran slide-up
✅ Boutons pleine largeur
```

---

## 🧪 Scénarios de Test

### Scénario 1 : Gestion d'une Soirée (Admin)
```bash
1. Connectez-vous en admin
2. Allez sur /admin/tables
3. Créez 3 nouvelles tables (21, 22, 23)
4. Table 21 : Mettez en "Réservée"
5. Table 22 : Mettez en "Occupée"
6. Table 23 : Mettez en "Hors service"
7. Voyez les badges de couleur changer
8. Consultez le dashboard - voyez les stats mises à jour
```

### Scénario 2 : Service d'un Client (Serveur)
```bash
1. Connectez-vous en serveur
2. Allez sur /serveur
3. Identifiez une table libre (verte)
4. Voyez les commandes en attente
5. Passez une commande de "En attente" à "En préparation"
6. Puis "En préparation" à "Prêt"
7. Puis "Prêt" à "Servi"
8. Finalement "Servi" à "Payé"
```

### Scénario 3 : Expérience Mobile (Tous)
```bash
1. Passez en mode mobile (DevTools)
2. Testez le menu hamburger
3. Naviguez entre les pages
4. Ouvrez un modal
5. Testez la fermeture (backdrop, ESC)
6. Scrollez les listes
7. Testez les boutons tactiles
```

---

## 💡 Tips & Tricks

### Pour les Admins 👑
```
💡 Double-cliquez sur une table pour l'éditer rapidement
💡 Utilisez les filtres pour trouver les tables libres
💡 Le QR Code se génère automatiquement
💡 Les stats se mettent à jour en temps réel
```

### Pour les Serveurs 👨‍💼
```
💡 Les tables vertes sont disponibles
💡 Les commandes s'actualisent automatiquement
💡 Utilisez les boutons rapides de statut
💡 Consultez l'heure de chaque commande
```

### Pour les Tests 🧪
```
💡 Utilisez Chrome pour les DevTools
💡 F12 pour ouvrir la console
💡 Ctrl+Shift+M pour le mode responsive
💡 Ctrl+R pour recharger
💡 Ctrl+Shift+R pour vider le cache
```

---

## 🔧 Troubleshooting

### Problème : Pas connecté après login
```
Solution : Videz le cache (Ctrl+Shift+R)
```

### Problème : Modal ne s'ouvre pas
```
Solution : Vérifiez la console (F12) pour les erreurs
```

### Problème : Sidebar ne se ferme pas (mobile)
```
Solution : Cliquez sur l'overlay noir ou rechargez
```

### Problème : Données ne se chargent pas
```
Solution : Vérifiez que le serveur tourne (npm run dev)
```

---

## 📊 Données Préchargées

### Tables : 20 créées
- 5 Occupées (tables 1-5)
- 10 Libres (tables 6-15)
- 5 Réservées (tables 16-20)

### Menu : 24 items
- 4 Entrées (8,50€ - 14,00€)
- 6 Plats (15,00€ - 26,50€)
- 4 Desserts (6,50€ - 9,00€)
- 10 Boissons/Cocktails (2,50€ - 12,00€)

### Commandes : 2 exemples
- 1 En préparation (45,00€)
- 1 Payée (37,00€)

---

## 🚀 Commandes Utiles

```bash
# Lancer l'application
npm run dev

# Réinitialiser la base de données
npx prisma migrate reset

# Recharger les données de test
npx prisma db seed

# Builder pour production
npm run build

# Vérifier les erreurs TypeScript
npm run typecheck
```

---

## 📞 Besoin d'Aide ?

**Documentation complète** : Voir `USER_GUIDE.md`  
**Documentation technique** : Voir `DEVELOPER_GUIDE.md`  
**Support** : support@acoustic-club.com

---

## ✅ Checklist de Test Complet

### Authentification
- [ ] Login admin
- [ ] Login serveur
- [ ] Login client
- [ ] Login premium
- [ ] Logout
- [ ] Session persistante (reload)

### Admin - Tables
- [ ] Créer table
- [ ] Voir détails
- [ ] Modifier table
- [ ] Changer statut
- [ ] Supprimer table
- [ ] Vue mobile (cartes)
- [ ] Vue desktop (tableau)

### Serveur
- [ ] Voir état tables
- [ ] Voir commandes
- [ ] Changer statut commande
- [ ] Stats rapides

### Responsive
- [ ] Mobile 375px
- [ ] Tablet 768px
- [ ] Desktop 1280px
- [ ] Menu hamburger
- [ ] Modals adaptés

### Performance
- [ ] Chargement < 2s
- [ ] Animations fluides
- [ ] Pas d'erreurs console
- [ ] Hover effects

---

**Temps total de test estimé : 10-15 minutes**

**Bon test ! 🎉**
