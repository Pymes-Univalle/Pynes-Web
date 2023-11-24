FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
#RUN npm install -g npm@latest
RUN npm install --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build
#RUN npm run dev

FROM node:16-alpine AS runner
WORKDIR /app

#ENV NODE_ENV production
ENV NODE_ENV dev

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

#archivos necesarios de config
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./

#archivos del build Next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#archivos para prisma

#COPY --from=builder /app/schema.prisma ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]