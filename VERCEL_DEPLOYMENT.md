# 🚀 Guide de Déploiement Vercel - Acoustic Club

**Date** : 17 Octobre 2025  
**Version** : 1.0

---

## 📋 Prérequis

- ✅ Compte Vercel (gratuit)
- ✅ Repository GitHub connecté
- ✅ Variables d'environnement prêtes

---

## 🔧 Configuration Vercel

### 1. Variables d'Environnement à Ajouter

Dans Vercel Dashboard → Settings → Environment Variables, ajoutez :

#### **DATABASE_URL** (Required)
```
postgresql://neondb_owner:npg_HIWy0GxluF6T@ep-frosty-bush-agtj5dec-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
- ✅ Production
- ✅ Preview
- ✅ Development

#### **JWT_SECRET** (Required)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyOjEiLCJpYXQiOjE3NjA3MzMzODcsImV4cCI6MTc2MDczNjk4N30.Ha-5E41dkLa1DzrAIZTSAgvL7Bb88GRr7vxM0KGeWAM
```
⚠️ **IMPORTANT** : Changez cette valeur en production avec une clé forte !
- ✅ Production
- ✅ Preview
- ✅ Development

#### **NODE_ENV** (Optional)
```
production
```
- ✅ Production uniquement

#### **API_BASE_URL** (Optional)
```
/api
```
- ✅ Production
- ✅ Preview
- ✅ Development

---

## 🚀 Déploiement via Vercel Dashboard

### Étape 1 : Importer le Projet
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"New Project"**
3. Sélectionnez le repository **"acoustic-club"**
4. Cliquez sur **"Import"**

### Étape 2 : Configuration Build
Vercel détecte automatiquement Nuxt 3. Vérifiez :

**Framework Preset** : `Nuxt.js`  
**Build Command** : `npm run build` (auto-détecté)  
**Output Directory** : `.output/public` (auto-détecté)  
**Install Command** : `npm install` (auto-détecté)

### Étape 3 : Ajouter les Variables d'Environnement
1. Cliquez sur **"Environment Variables"**
2. Ajoutez les 4 variables ci-dessus
3. Sélectionnez les environnements pour chacune

### Étape 4 : Déployer
1. Cliquez sur **"Deploy"**
2. Attendez ~3-5 minutes
3. Votre site sera disponible sur `https://your-project.vercel.app`

---

## 🚀 Déploiement via CLI Vercel

### Installation CLI
```bash
npm install -g vercel
```

### Connexion
```bash
vercel login
```

### Premier Déploiement
```bash
cd c:\Users\USER\acoustic-club
vercel
```

Répondez aux questions :
- **Set up and deploy** : `Y`
- **Which scope** : Votre compte
- **Link to existing project** : `N`
- **Project name** : `acoustic-club`
- **Directory** : `./` (défaut)
- **Override settings** : `N`

### Ajouter les Variables d'Environnement
```bash
# DATABASE_URL
vercel env add DATABASE_URL

# JWT_SECRET
vercel env add JWT_SECRET

# NODE_ENV
vercel env add NODE_ENV

# API_BASE_URL
vercel env add API_BASE_URL
```

Sélectionnez les environnements (Production, Preview, Development) pour chaque variable.

### Déploiement en Production
```bash
vercel --prod
```

---

## ⚙️ Configuration Post-Déploiement

### 1. Migrer la Base de Données (Important !)

Après le premier déploiement, les migrations Prisma doivent être exécutées :

#### Option A : Via Prisma Cloud (Recommandé)
1. Créez un compte sur [prisma.io](https://www.prisma.io/)
2. Connectez votre projet
3. Exécutez les migrations via le dashboard

#### Option B : Localement contre Production
```bash
# Utilisez l'URL de production
DATABASE_URL="votre-url-production" npx prisma migrate deploy
```

#### Option C : Script de Post-Deploy (Automatique)

Ajoutez dans `package.json` :
```json
{
  "scripts": {
    "postbuild": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && npm run build"
  }
}
```

### 2. Seed Initial (Première fois uniquement)
```bash
DATABASE_URL="votre-url-production" npx prisma db seed
```

⚠️ **Attention** : Le seed écrasera les données existantes. À faire uniquement sur une DB vide !

---

## 🔍 Vérification du Déploiement

### Checklist Post-Déploiement
- [ ] Site accessible via l'URL Vercel
- [ ] Page d'accueil charge correctement
- [ ] Login fonctionne (`admin@acoustic-club.com` / `password123`)
- [ ] Tables chargent correctement (`/tables`)
- [ ] Dashboard admin accessible (`/admin`)
- [ ] Interface serveur accessible (`/serveur`)
- [ ] Pas d'erreurs dans la console (F12)
- [ ] API répond correctement (`/api/...`)

### Tests Rapides
```bash
# Test 1 : Page d'accueil
curl https://your-project.vercel.app

# Test 2 : API Health (si disponible)
curl https://your-project.vercel.app/api/health

# Test 3 : Login
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acoustic-club.com","password":"password123"}'
```

---

## 🐛 Résolution de Problèmes

### Erreur : "PRISMA_CLIENT_ENGINE_TYPE" not found
**Solution** : Ajoutez dans `package.json` :
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```
Et exécutez :
```bash
npx prisma generate
```

### Erreur : Build Failed (Timeout)
**Solution** : Vercel Free tier a une limite de 45 secondes. Optimisez :
```bash
# Supprimez node_modules localement avant commit
rm -rf node_modules
git add .
git commit -m "Clean build"
git push
```

### Erreur : Database Connection Failed
**Solution** : Vérifiez que `DATABASE_URL` est bien définie dans Vercel :
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Vérifiez que `DATABASE_URL` existe pour Production/Preview
3. Redéployez : `vercel --prod`

### Erreur : 500 Internal Server Error
**Solution** : Consultez les logs Vercel :
```bash
vercel logs your-project.vercel.app
```
Ou via le Dashboard : Deployments → Votre déploiement → Function Logs

### Erreur : Migration Failed
**Solution** : Exécutez les migrations manuellement :
```bash
DATABASE_URL="votre-url-production" npx prisma migrate deploy
```

---

## 📊 Monitoring et Logs

### Voir les Logs en Temps Réel
```bash
vercel logs --follow
```

### Voir les Logs d'une Fonction Spécifique
```bash
vercel logs [url-de-la-fonction]
```

### Dashboard Vercel
Accédez aux métriques via :
- **Analytics** : Trafic, Performance
- **Speed Insights** : Core Web Vitals
- **Deployments** : Historique des déploiements
- **Settings** : Configuration, Variables d'environnement

---

## 🔄 Déploiements Automatiques

### Configuration GitHub
Vercel déploie automatiquement à chaque push :

- **Push sur `main`** → Déploiement Production
- **Push sur autre branche** → Déploiement Preview
- **Pull Request** → Déploiement Preview avec URL unique

### Désactiver les Déploiements Auto
Vercel Dashboard → Settings → Git → Disable Auto Deployments

---

## 🌍 Domaine Personnalisé

### Ajouter un Domaine
1. Vercel Dashboard → Project → Settings → Domains
2. Cliquez sur **"Add"**
3. Entrez votre domaine : `acoustic-club.com`
4. Suivez les instructions DNS

### Configuration DNS Recommandée
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔐 Sécurité en Production

### ⚠️ Changements Obligatoires Avant Production

#### 1. Changer JWT_SECRET
```bash
# Générer une nouvelle clé forte
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copiez le résultat et mettez-le dans Vercel Environment Variables.

#### 2. Base de Données
- ✅ Utilisez une base de données de production (pas de dev)
- ✅ Activez SSL (`sslmode=require`)
- ✅ Utilisez connection pooling (Neon déjà configuré)

#### 3. Variables d'Environnement
- ❌ Ne commitez JAMAIS `.env` sur Git
- ✅ Utilisez uniquement Vercel Environment Variables
- ✅ Différenciez Production / Preview / Development

#### 4. Mots de Passe par Défaut
⚠️ **CRITIQUE** : Changez tous les mots de passe de test (`password123`) en production !

Via Prisma Studio ou SQL :
```sql
-- Désactiver les comptes de test
UPDATE "User" 
SET password = 'DESACTIVÉ'
WHERE email IN (
  'admin@acoustic-club.com',
  'serveur@acoustic-club.com',
  'client@acoustic-club.com',
  'premium@acoustic-club.com'
);
```

---

## 📈 Optimisations Performance

### Cache Headers
Vercel configure automatiquement les cache headers optimaux.

### Image Optimization
Nuxt Image est configuré. Images automatiquement optimisées.

### SSR vs SSG
- **SSR** (Server-Side Rendering) : Activé par défaut
- **SSG** (Static Site Generation) : Pour pages statiques

### Edge Functions
Considérez l'upgrade vers Edge Functions pour latence minimale.

---

## 💰 Coûts Vercel

### Plan Hobby (Gratuit)
- ✅ 100 GB bandwidth/mois
- ✅ Déploiements illimités
- ✅ Domaines personnalisés
- ✅ SSL automatique
- ⚠️ Limite : 45 secondes de build

### Plan Pro ($20/mois)
- ✅ 1 TB bandwidth/mois
- ✅ Analytics avancées
- ✅ Pas de limite de build
- ✅ Support prioritaire

---

## 📞 Support

### Documentation Officielle
- [Vercel Docs](https://vercel.com/docs)
- [Nuxt 3 Deployment](https://nuxt.com/docs/getting-started/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

### Communauté
- [Vercel Discord](https://vercel.com/discord)
- [Nuxt Discord](https://discord.com/invite/nuxt)

---

## ✅ Checklist Finale

### Avant le Premier Déploiement
- [ ] `.env` ajouté à `.gitignore`
- [ ] `vercel.json` créé
- [ ] `nuxt.config.ts` avec preset Vercel
- [ ] Variables d'environnement préparées
- [ ] Repository GitHub à jour

### Après le Premier Déploiement
- [ ] Migrations Prisma exécutées
- [ ] Seed initial chargé (si nécessaire)
- [ ] Tests de connexion OK
- [ ] Tests des 4 comptes OK
- [ ] JWT_SECRET changé (production)
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🎉 Résumé

### Commandes Essentielles
```bash
# Installation CLI
npm install -g vercel

# Login
vercel login

# Premier déploiement
vercel

# Déploiement production
vercel --prod

# Voir les logs
vercel logs --follow

# Ajouter variable d'environnement
vercel env add VARIABLE_NAME
```

### URLs Importantes
- **Dashboard** : https://vercel.com/dashboard
- **Docs** : https://vercel.com/docs
- **Support** : https://vercel.com/support

---

**Votre application Acoustic Club est maintenant prête pour la production ! 🚀**

**Dernière mise à jour** : 17 Octobre 2025  
**Version** : 1.0  
**Support** : docs@acoustic-club.com
