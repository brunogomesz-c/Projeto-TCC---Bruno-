
# Schema da Base de Verdades (IndexedDB)

- **Banco**: `kb`
- **Versão**: 1
- **Store**: `facts` (keyPath: `id` — hash do enunciado normalizado)

## Campos
- `id`: string (hash)
- `statement`: string (enunciado normalizado)
- `status`: "true" | "false" | "contested"
- `sources`: Array<{ url: string, title?: string, retrievedAt: string }>
- `tags`: string[]
- `lastVerifiedAt`: string (ISO)
- `confidence`: number (0–1)

## Índices
- `tags` (multiEntry)
- `lastVerifiedAt`
