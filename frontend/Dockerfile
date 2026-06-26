# --- Étape de Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances avec contournement des conflits de versions
RUN npm ci --legacy-peer-deps

# Copie du reste des sources
COPY . .

# Build de production
RUN npm run build

# --- Étape de Runtime ---
FROM nginx:alpine

# Remplacement de la configuration Nginx par défaut par notre configuration SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers compilés d'Angular dans le répertoire racine de Nginx
COPY --from=builder /app/dist/note/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
