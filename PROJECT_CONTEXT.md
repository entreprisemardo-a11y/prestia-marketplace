# CONTEXTE TECHNIQUE & MÉTIER DU PROJET — PRESTIA

Ce document est rédigé pour permettre à un développeur ou à un modèle d'IA (notamment lors d'une importation dans **Google AI Studio**) d'appréhender instantanément les tenants, les aboutissants, l'architecture et les règles de gouvernance du projet.

---

## 1. Objectif Produit

**Prestia** a pour ambition de digitaliser et professionnaliser le secteur des prestations de services en Afrique (Côte d'Ivoire, Bénin, Sénégal, etc.) :
- **Pour les clients** : trouver rapidement des prestataires qualifiés et vérifiés à proximité immédiate (calcul kilométrique GPS), réserver un service au juste prix en FCFA, communiquer via un chat interne sécurisé, et ne payer qu'une fois la prestation validée.
- **Pour les prestataires** : disposer d'un véritable tableau de bord professionnel, gérer leurs commandes, soumettre leurs pièces d'identité (KYC) pour obtenir le badge de confiance "PRO Vérifié", et percevoir leurs revenus via Mobile Money / Virement.

---

## 2. État d'Avancement des Fonctionnalités

### Déjà Implémenté (100% Fonctionnel)
- **Modèle relationnel en UUID** : 10 migrations complètes (`users`, `profiles`, `categories`, `services`, `conversations`, `messages`, `orders`, `transactions`, `reviews`, `personal_access_tokens`).
- **Moteur de Recherche Géolocalisé** (`SearchController.php`) : calcul Haversine pour trier par distance kilométrique et filtrer par catégorie et prix.
- **Modération Automatique du Chat** (`ChatController.php`) : masquage regex en temps réel des numéros de téléphone, adresses email et URLs pour prévenir le contournement de la plateforme.
- **Machine à États des Commandes** (`OrderController.php`) : cycle de vie strict :
  - `pending` (client passe la commande)
  - `accepted` (acceptée par le prestataire)
  - `in_progress` (démarrée par le prestataire)
  - `completed` (validée exclusivement par le client)
- **Vérification KYC** (`KycController.php`) : téléversement de documents d'identité avec blocage de création de service tant que `kyc_status !== 'approved'`.
- **UI & Design System** : 14 interfaces complètes avec React 19, Tailwind CSS v4, Framer Motion et Recharts (Home, Explore, HowItWorks, Login, Register, VerifyEmail, KycVerification, Overview, Orders, Messages, Wallet, Settings, ClientOverview, ClientPurchases, ClientFavorites).
- **Routage SPA Hybride** : `routes/web.php` renvoie sur `app.blade.php`, couplé à React Router DOM 7 et un middleware Vite pour prévisualisation directe.

### En Cours / À Connecter
1. **Liaison Formulaires Auth ↔ Backend** : Remplacer les simulations temporaires (`setTimeout`) dans `Login.tsx`, `Register.tsx`, `VerifyEmail.tsx`, `KycVerification.tsx` par des appels réels à l'API via l'instance `axios.js`.
2. **Page Détail de Service & Commande** (`/services/:id` ou `/services/:slug`) : affichage complet des détails d'une offre et déclenchement de `/api/services/{id}/orders`.
3. **Gestion des Services Prestataire** : formulaire de publication et d'édition dans l'espace pro (`/dashboard/services`).
4. **Seeders de Démonstration** : génération de catégories et de services réels en base de données.

---

## 3. Décisions Techniques Majeures

1. **Architecture DDD (Domain-Driven Design)** :
   - Tout le code métier réside dans `app/Domains/[NomDuDomaine]`.
   - Les contrôleurs, modèles, Form Requests et ressources sont colocalisés au sein de leur domaine.
2. **PostgreSQL & UUID v4** :
   - Tous les identifiants en base sont des UUIDs pour éviter l'énumération séquentielle des ressources et faciliter la scalabilité horizontale.
3. **Sécurité & Tokens Sanctum** :
   - L'authentification API repose sur Laravel Sanctum (`auth:sanctum`). Les tokens Bearer sont retournés lors de la connexion et de l'inscription.
4. **Tailwind CSS v4** :
   - Configuration via le nouveau moteur `@tailwindcss/vite` et import `@import 'tailwindcss';` dans `resources/css/app.css`. Les tokens de thème (brand, radius, dark/light) sont déclarés via la directive `@theme`.

---

## 4. Règles Strictes pour les Prochaines Modifications

Lors de toute intervention future (par un humain ou par un agent IA) :
1. **Ne jamais commiter de secrets** : Les fichiers `.env` ou clés privées ne doivent sous aucun prétexte être versionnés.
2. **Respecter la convention DDD** : Tout nouveau modèle, contrôleur ou service doit être placé dans le domaine correspondant sous `app/Domains/`.
3. **Ne jamais casser la machine à états des commandes** : Toute modification des statuts de commande doit passer par `OrderController::transition` ou respecter les règles d'intégrité métier.
4. **Maintenir la compatibilité TypeScript** : Toujours vérifier que `npm run types:check` ne remonte aucune erreur avant de valider un composant.
5. **Maintenir la cohérence esthétique** : Utiliser la palette de couleurs Prestia (`brand-50` à `brand-900`), les composants Lucide React et les arrondis doux (`rounded-xl` / `rounded-2xl`).

---

## 5. Guide Spécifique pour Google AI Studio

Lors de l'ouverture de ce dépôt dans **Google AI Studio** :
- **Fichiers prioritaires à indexer pour comprendre l'architecture** :
  - `routes/api.php`
  - `app/Domains/Auth/Controllers/AuthController.php`
  - `app/Domains/Marketplace/Controllers/ServiceController.php`
  - `app/Domains/Orders/Controllers/OrderController.php`
  - `resources/js/src/app/App.tsx`
  - `resources/js/src/shared/api/axios.js`
- **Variables d'environnement à renseigner dans l'environnement d'exécution** :
  - Se référer au fichier `.env.example`.
