# PRESTIA — Marketplace Panafricaine de Services

Prestia est une plateforme moderne de mise en relation entre des clients et des prestataires de services qualifiés (artisans, techniciens, indépendants, etc.) avec une tarification en **FCFA** et une interface conçue selon les plus hauts standards d'UX/UI.

---

## 🚀 Technologies Utilisées

### Backend
- **Framework** : Laravel 11+ / PHP 8.3+
- **Architecture** : Domain-Driven Design (DDD) modulaire (`app/Domains/`)
- **Authentification & Sécurité** : Laravel Sanctum (Tokens Bearer), Vérification email par OTP à 6 chiffres, Modération automatique du chat par expressions régulières
- **Base de données** : PostgreSQL avec clés primaires universelles en **UUID** et formule géodésique de Haversine pour la recherche de proximité

### Frontend
- **Framework** : React 19.2 + TypeScript 5.7+
- **Outillage** : Vite 8.2 + `@tailwindcss/vite` (Tailwind CSS v4)
- **Routage & Données** : React Router DOM v7, TanStack React Query v5
- **Animations & Graphismes** : Framer Motion, Recharts, Lucide React, React Hook Form
- **Design System** : Thème émeraude signature (`--color-brand`), glassmorphism, mode sombre et mode clair

---

## 🏛️ Architecture du Projet

Le backend est structuré par domaines métier dans `app/Domains/` :

```
app/Domains/
├── Auth/           # Inscription OTP, Connexion, Vérification Email, Sanctum
├── Communication/  # Conversations, Messages avec modération regex (téléphone, email, liens)
├── Engagement/     # Avis clients et réponses prestataires (Reviews)
├── Finance/        # Transactions et gestion des paiements
├── Marketplace/    # Services, Catégories, Moteur de recherche géolocalisé (Haversine)
├── Orders/         # Commandes avec machine à états stricte (pending -> accepted -> in_progress -> completed)
└── Users/          # Utilisateurs, Profils géolocalisés et conformité KYC
```

Le frontend est structuré par fonctionnalités dans `resources/js/src/` :

```
resources/js/src/
├── app/            # Racine de l'application et routeur principal (App.tsx)
├── layouts/        # Layouts dédiés (AppLayout, DashboardLayout, ClientLayout)
├── features/       # Modules : auth, home, services, dashboard, client, orders, chat
└── shared/         # Instance Axios configurée, utilitaires de style (cn, clsx)
```

---

## 💻 Installation Locale

### Prérequis
- **PHP** : >= 8.3 avec extensions `pdo_pgsql`, `mbstring`, `openssl`
- **Node.js** : >= 22.12.0
- **Composer** : >= 2.0
- **PostgreSQL** : >= 14

### 1. Cloner le projet
```bash
git clone https://github.com/[VOTRE_ORGANISATION]/[VOTRE_REPO].git
cd [VOTRE_REPO]
```

### 2. Configurer l'environnement
Copiez le modèle de configuration et générez la clé applicative :
```bash
cp .env.example .env
php artisan key:generate
```
Configurez vos accès PostgreSQL dans le fichier `.env` :
```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=marketplace_db
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

### 3. Installer les dépendances
```bash
# Dépendances PHP
composer install

# Dépendances JavaScript / TypeScript
npm install
```

### 4. Exécuter les migrations
```bash
php artisan migrate
```

---

## ⚡ Commandes de Développement

```bash
# Lancer le serveur Vite (Frontend React)
npm run dev

# Lancer le serveur d'API Laravel (Backend)
php artisan serve

# Lancer la vérification des types TypeScript
npm run types:check

# Lancer le linter
npm run lint

# Compiler l'application pour la production
npm run build
```

---

## 🔒 Sécurité & Bonnes Pratiques

- **Zéro Secret dans le Dépôt** : Le fichier `.env` est strictement exclu par `.gitignore`.
- **Conformité KYC** : Les pièces d'identité téléversées par les prestataires sont conservées dans `storage/app/kyc_documents/` qui est exclu du versionnement.
- **Règles de Transition** : Les commandes suivent une machine à états stricte empêchant les transitions de statut non autorisées.
- **Modération Anti-Contournement** : Les coordonnées de contact partagées dans le chat interne sont automatiquement masquées par regex avant stockage.

---

## 📄 Licence
Ce projet est sous licence propriétaire privée.
