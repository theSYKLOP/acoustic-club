# 🔧 Résolution de l'Erreur 404: NOT_FOUND après Déploiement Vercel

## 📋 Diagnostic Rapide

Vous avez vu : **404: NOT_FOUND** sur votre domaine Vercel

**Cela signifie**: Vercel a déployé, mais l'application ne s'exécute pas correctement.

---

## ✅ **Solution Étape par Étape**

### **ÉTAPE 1: Vérifier les Variables d'Environnement (CRITIQUE)**

1. Allez sur https://vercel.com/mehdis-projects-aa063abc/acoustic-club
2. Cliquez sur **Settings** → **Environment Variables**
3. Vérifiez que vous avez ajouté :

```
DATABASE_URL = postgresql://...your-neon-connection...
JWT_SECRET = your-secret-key-here
NODE_ENV = production
API_BASE_URL = https://acoustic-club-xxxx.vercel.app
```

❌ **Si ces variables manquent**, ajoutez-les MAINTENANT et cliquez **Redeploy**

### **ÉTAPE 2: Redéployer avec les Variables**

```powershell
# Dans le dashboard Vercel, cliquez sur le dernier déploiement
# Puis cliquez "Redeploy" en haut à droite

# Ou via CLI :
vercel --prod --force
```

### **ÉTAPE 3: Vérifier les Logs de Déploiement**

```powershell
# Voir les logs complets
vercel logs https://acoustic-club-xxxx.vercel.app --limit 200

# Ou allez dans le dashboard Vercel
# Deployments → Cliquez sur le dernier déploiement → Logs
```

**Cherchez les messages d'erreur TYPE:**
- ❌ `Cannot connect to database`
- ❌ `MODULE_NOT_FOUND`
- ❌ `ENOENT: no such file`
- ✅ `listening on` = SUCCÈS

---

## 🎯 **Causes Possibles et Solutions**

### **Cause 1: DATABASE_URL Manquante ou Incorrecte**

**Symptôme**: Erreur `Cannot connect to database` dans les logs

**Solution**:
```powershell
# 1. Vérifiez votre .env local
Get-Content .env | Select-String "DATABASE_URL"

# 2. Copiez cette URL exactement vers Vercel → Environment Variables
# 3. Redéployez
vercel --prod
```

### **Cause 2: JWT_SECRET Manquante**

**Symptôme**: Erreur lors du login ou au démarrage du serveur

**Solution**:
```powershell
# 1. Générez une clé sécurisée
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Ajoutez dans Vercel → Environment Variables → JWT_SECRET
# 3. Redéployez
vercel --prod
```

### **Cause 3: PORT Non Configuré**

**Symptôme**: Le serveur démarre mais n'écoute pas le bon port

**Solution**:
Créez un fichier `server/middleware/vercel-port.ts` :

```typescript
// server/middleware/vercel-port.ts
export default defineEventHandler(() => {
  // Vercel configure PORT automatiquement
  // Rien à faire ici, Nuxt le gère
})
```

Puis ajoutez dans `nuxt.config.ts` :

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: 'node',
    serveStatic: true,
    hooks: {
      ready: () => {
        // Port sera dynamiquement assigné par Vercel
      }
    }
  }
})
```

### **Cause 4: Fichiers Statiques Manquants**

**Symptôme**: Erreur 404 sur CSS/JS

**Solution**:
```powershell
# Vérifiez que .output/public existe après le build
npm run build
Get-Item .output/public -Recurse | Measure-Object

# Doit afficher des fichiers
```

---

## 🚨 **Checklist de Redéploiement**

- ✅ Variables d'environnement ajoutées dans Vercel Dashboard
- ✅ DATABASE_URL correcte et testée
- ✅ JWT_SECRET défini
- ✅ NODE_ENV = production
- ✅ Code pushé sur GitHub : `git push origin main`
- ✅ Redéployer : `vercel --prod --force`
- ✅ Attendre ~2-3 minutes (temps de déploiement)
- ✅ Vérifier les logs : `vercel logs <votre-url>`

---

## 🔍 **Vérification du Déploiement**

Une fois en live, testez ces URLs :

```bash
# 1. Page d'accueil (doit retourner HTML)
curl https://acoustic-club-xxxx.vercel.app/

# 2. API Tables (doit retourner JSON)
curl https://acoustic-club-xxxx.vercel.app/api/tables

# 3. Login (doit accepter POST)
curl -X POST https://acoustic-club-xxxx.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acoustic-club.com","password":"password123"}'
```

---

## 📊 **Tableau de Diagnostic Complet**

| Étape | Action | Vérification |
|-------|--------|-------------|
| 1 | Ajouter DATABASE_URL | ✅ Vercel Dashboard → Env Vars |
| 2 | Ajouter JWT_SECRET | ✅ Vercel Dashboard → Env Vars |
| 3 | Redéployer | ✅ `vercel --prod --force` |
| 4 | Attendre | ✅ 2-3 minutes |
| 5 | Vérifier logs | ✅ `vercel logs <url>` |
| 6 | Tester API | ✅ `curl /api/tables` |

---

## 🎯 **Solution Rapide en 5 Minutes**

```powershell
# 1. Récupérez votre DATABASE_URL local
Get-Content .env | Select-String "DATABASE_URL"

# 2. Allez sur Vercel Dashboard
# https://vercel.com/mehdis-projects-aa063abc/acoustic-club/settings/environment-variables

# 3. Ajoutez (ou corrigez) :
# DATABASE_URL = [votre-url]
# JWT_SECRET = [une-clé-secrète]
# NODE_ENV = production

# 4. Cliquez Redeploy

# 5. Attendez 2-3 minutes et testez
curl https://acoustic-club-xxxx.vercel.app/
```

---

## 🆘 **Si Ça Ne Fonctionne Toujours Pas**

1. **Vérifiez les logs Vercel** :
   ```powershell
   vercel logs https://acoustic-club-xxxx.vercel.app --limit 500
   ```

2. **Cherchez les erreurs TYPE** :
   - `ENOENT` = Fichier manquant
   - `ECONNREFUSED` = Connexion DB impossible
   - `SyntaxError` = Erreur de code
   - `TypeError` = Erreur de type

3. **Si vous trouvez une erreur**, envoyez-moi le message complet et je fixerai ! 🔧

---

## ✨ **Status: Production Ready**

Une fois que le déploiement fonctionne :

✅ Application en live sur Vercel  
✅ Base de données PostgreSQL connectée  
✅ Authentication JWT fonctionnelle  
✅ API REST opérationnelle  

**Félicitations ! 🎉**
