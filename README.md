# User Management App

Aplikacja do zarządzania użytkownikami z możliwością przeglądania ich postów i komentarzy. Dane pobierane są z [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## Funkcjonalności
- Lista użytkowników z możliwością wyszukiwania
- CRUD dla użytkowników (dodawanie, edycja, usuwanie)
- Przeglądanie postów użytkownika
- Przeglądanie komentarzy do postów
- System notyfikacji (powiadomienia o sukcesie/błędzie)
- Tryb offline z cache'owaniem danych w localStorage
- Walidacja formularzy (Zod + React Hook Form)
## Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`

## Skrypty

| Skrypt | Opis |
|--------|------|
| `npm run dev` | Uruchom serwer deweloperski |
| `npm run build` | Zbuduj aplikację do produkcji |
| `npm run preview` | Podgląd wersji produkcyjnej |
| `npm run lint` | Sprawdź kod ESLint |
| `npm run test` | Uruchom testy (watch mode) |
| `npm run test:run` | Uruchom testy jednorazowo |

## Struktura projektu

```
src/
├── api/
│   ├── apiClient.ts          # Konfiguracja Axios
│   └── services/             # Serwisy API (user, post, comment, cache)
├── components/
│   ├── common/               # Wspólne komponenty (Header, Loader, Logo, etc.)
│   ├── posts/                # Komponenty postów i komentarzy
│   └── users/                # Komponenty użytkowników i modale
├── context/                  # React Context (Notification, Offline)
├── hooks/                    # Custom hooks (useCrud, useModal, useNotification)
├── schemas/                  # Schematy walidacji Zod
├── types/                    # Typy TypeScript
└── utils/                    # Stałe i helpers
```

## API

Aplikacja korzysta z JSONPlaceholder API:
- `GET /users` - lista użytkowników
- `GET /posts?userId={id}` - posty użytkownika
- `GET /comments?postId={id}` - komentarze do posta
- `POST /users` - dodaj użytkownika
- `PUT /users/{id}` - edytuj użytkownika
- `DELETE /users/{id}` - usuń użytkownika
