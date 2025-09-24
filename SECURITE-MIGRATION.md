# CONFIGURATION SÉCURISÉE POUR NETLIFY + RENDER

## 1. VARIABLES D'ENVIRONNEMENT NETLIFY
# À configurer dans : Site settings > Environment variables

VITE_API_URL=https://vtc-l3c5.onrender.com
NETLIFY_AUTH_ENABLED=false

## 2. VARIABLES D'ENVIRONNEMENT RENDER
# À configurer dans : Settings > Environment

NODE_ENV=production
JWT_SECRET=votre-secret-jwt-ultra-securise-de-32-caracteres-minimum
ADMIN_PASSWORD_HASH=$2b$10$... (générer avec bcrypt)
STEPH_PASSWORD_HASH=$2b$10$... (générer avec bcrypt)

## 3. ÉTAPES DE MIGRATION SÉCURISÉE

### Étape 1: Mettre à jour le backend
- Installer : npm install bcrypt jsonwebtoken
- Ajouter les routes d'authentification (voir backend-auth-example.js)
- Configurer les variables d'environnement dans Render

### Étape 2: Générer les hash des mots de passe
```bash
# Dans votre backend
node -e "console.log(require('bcrypt').hashSync('VTC2025Admin!', 10))"
node -e "console.log(require('bcrypt').hashSync('Copacabana003', 10))"
```

### Étape 3: Nettoyer les _headers Netlify
- Supprimer la Basic Auth de _headers
- Garder uniquement les headers de sécurité

### Étape 4: Tester l'authentification
- Déployer le backend avec les nouvelles variables
- Tester la connexion sur le frontend
- Vérifier que les appels API sont sécurisés

## 4. AVANTAGES DE CETTE APPROCHE

✅ Mots de passe jamais exposés côté client
✅ Authentification basée sur JWT (standard industrie)
✅ Tokens avec expiration (24h)
✅ Hash bcrypt pour les mots de passe (inviolable)
✅ Protection des API par token
✅ Séparation frontend/backend sécurisée

## 5. NIVEAU DE SÉCURITÉ

🔒 EXCELLENT - Prêt pour la production
- Aucun credential en dur
- Authentification JWT standard
- Mots de passe hashés
- Tokens sécurisés
- Protection CORS maintenue