# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

# créer utilisateur non-root (important pour ton TP)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app /app

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

CMD ["node", "src/index.js"]