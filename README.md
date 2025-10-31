# Cognito

Nowoczesna platforma e-commerce z AI, podobna do Magento czy WooCommerce.

## Założenia Projektu

Cognito to innowacyjna platforma e-commerce wykorzystująca sztuczną inteligencję do usprawnienia doświadczenia zakupowego.

### Główne Komponenty

1. **API Backend**
   - Wykorzystuje LangGraph do zarządzania workflow'ami AI
   - MongoDB jako baza danych
   - Obsługa złożonych operacji e-commerce

2. **Chat AI**
   - Przeszukiwanie produktów w naturalnym języku
   - Inteligentne rekomendacje
   - Możliwość zakupu bezpośrednio przez chat

3. **CMS**
   - Panel administracyjny do konfiguracji sklepu
   - Zarządzanie produktami
   - Zarządzanie zamówieniami i stanem magazynowym
   - Personalizacja i ustawienia

### Technologie

- **Frontend**: Next.js + TypeScript
- **Backend**: LangGraph + MongoDB
- **AI**: LangGraph dla conversational commerce
- **Database**: MongoDB

## Status

Projekt w fazie inicjalizacji.

## Uruchamianie Projektu

### Docker (Zalecane)

Uruchom całą aplikację z MongoDB za pomocą Docker Compose:

```bash
# Zbuduj i uruchom kontenery
docker-compose up -d

# Sprawdź logi
docker-compose logs -f app

# Zatrzymaj kontenery
docker-compose down
```

Dostępne serwisy:
- **Aplikacja**: http://localhost:3000
- **MongoDB**: localhost:27017

### Rozwój Lokalny

```bash
# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Zbuduj produkcyjną wersję
npm run build
npm start
```

## Konfiguracja

Skopiuj `.env.example` do `.env` i dostosuj zmienne środowiskowe:

```bash
cp .env.example .env
```
# cognito
