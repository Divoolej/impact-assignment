## Setup

```sh
npm install
npm run server
npm start (w osobnym terminalu)
```

## Komentarz

Zgodnie z treścią zadania starałem się by rozwiązanie było jak najprostsze.
Z zależności dodałem tylko react-select, bo choć zazwyczaj projektuję własne dropdowny, to zrobienie tego porządnie jest dość czasochłonne i myślę że mogłoby być dobrym zadaniem samym w somie. :)
Gdyby aplikacja była trochę większa to pewnie dodałbym też react-router i pullstate (albo użył Context API).
App.tsx trochę się rozrósł, ale większość złożoności wynika tutaj z natury backendu, a konkretnie z braku możliwości bezpośrednich operacji na filmach. Myślę że w prawdziwej aplikacji porozmawiałbym tu z zepołem backendowym o możliwości stworzenia bardziej ergonomicznego API.
Dla przykładu otestowałem komponent VideoForm i serwis videos.
