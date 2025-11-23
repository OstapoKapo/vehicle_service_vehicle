# Stage 1: build
FROM node:20 AS builder
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо всі залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Генеруємо Prisma Client
RUN npx prisma generate

# Будуємо TypeScript
RUN npm run build

# Stage 2: production
FROM node:20
WORKDIR /app

# Копіюємо prod залежності
COPY package*.json ./
RUN npm install --production

# Копіюємо build та Prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Копіюємо .env

EXPOSE 3001
CMD ["node", "dist/index.js"]
