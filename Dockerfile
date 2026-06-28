FROM node:24-bookworm-slim AS base


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# corepack enable - устанавливает corepack в PATH позволяяя использовать pnpm
RUN corepack enable

RUN apt-get update -y && apt-get install -y openssl


# ---------------------------------------------------------------------------


FROM base AS deps

# Устанавливает рабочую директорию для контейнера, которая будет использоваться для всех последующих команд
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
ENV CI=true
RUN pnpm install --frozen-lockfile


# ---------------------------------------------------------------------------

  
FROM deps AS builder

WORKDIR /app

COPY . .

RUN pnpm prisma generate
RUN pnpm build


# ---------------------------------------------------------------------------


FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV CI=true

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
