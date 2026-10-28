# Mise en route de la base de données (Firebase)

Le site utilise **Firebase** (gratuit pour cet usage) pour les comptes, les trajets, les réservations et la messagerie.
À faire une seule fois, environ 15 minutes.

## 1. Créer le projet
1. Aller sur https://console.firebase.google.com et se connecter avec un compte Google.
2. **Ajouter un projet** → lui donner un nom (ex. `cap-sur-le-bourget`). Google Analytics n'est pas nécessaire.

## 2. Activer la connexion par email
1. Menu **Build → Authentication → Commencer**.
2. Onglet **Sign-in method** → activer **Adresse e-mail/Mot de passe** (laisser « Lien par e-mail » désactivé) → Enregistrer.
3. Onglet **Settings → Domaines autorisés** : ajouter le domaine où le site est publié (ex. `mon-site.vercel.app`). `localhost` est déjà autorisé.
4. (Recommandé) Onglet **Templates** : passer la langue des emails en **Français** pour l'email de confirmation.

## 3. Créer la base de données
1. Menu **Build → Firestore Database → Créer une base de données**.
2. Choisir un emplacement en Europe (ex. `eur3` ou `europe-west1`) et le **mode production**.
3. Onglet **Règles** → remplacer tout le contenu par celui du fichier `firestore.rules` de ce dépôt → **Publier**.

## 4. Récupérer la configuration du site
1. **Paramètres du projet** (roue dentée) → **Vos applications** → icône **</>** (Web) → enregistrer l'application.
2. Copier les valeurs `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.

## 5. Renseigner ces valeurs
Ces valeurs ne sont pas secrètes, mais elles se règlent via des variables d'environnement :

| Variable | Valeur |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

- **Sur l'hébergeur (Vercel, etc.)** : Settings → Environment Variables, ajouter les six variables, puis **redéployer**.
- **En local** : copier `.env.example` en `.env.local` et remplir les valeurs.

## 6. Vérifier
1. Ouvrir le site, cliquer sur **Connexion → S'inscrire**, créer un compte.
2. Cliquer sur le lien reçu par email, revenir sur le site et cliquer sur **« J'ai cliqué sur le lien »**.
3. Publier un trajet, puis se connecter avec un second compte pour le réserver.

## Ce qui a changé par rapport à la version de test
- Les données ne sont plus enregistrées dans le navigateur : elles sont **partagées entre tous les utilisateurs**.
- Les trajets et la messagerie de démonstration ont été retirés ; le site démarre vide.
- La vérification d'email est **réelle** (lien envoyé par Firebase) : le bouton de simulation a disparu.
- Le téléphone est stocké à part : lisible uniquement par son propriétaire, et par le passager/conducteur d'un trajet **confirmé**.
- Les signalements sont enregistrés dans la collection `signalements`, consultable depuis la console Firebase (non visible dans le site).

## Points de vigilance
- Les règles de sécurité (`firestore.rules`) n'ont pas pu être testées automatiquement : faire un essai complet à deux comptes avant l'annonce publique (inscription, publication, réservation, annulation, messagerie, signalement).
- Le plan gratuit de Firebase (Spark) suffit largement pour un événement de cette taille, mais surveiller l'onglet **Utilisation** si le site est très partagé.
