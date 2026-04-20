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

COPY package.json pnpm-lock.yaml ./
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

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:deploy && node dist/src/main"]
