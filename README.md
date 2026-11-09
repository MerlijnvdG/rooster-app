# Rooster

Webapp om roosters te maken voor een team met een of meerdere filialen.

Managers kunnen:
- diensten inplannen per filiaal per week
- medewerkers en filialen beheren
- verlofaanvragen goed- of afkeuren
- per maand de gewerkte uren zien

Medewerkers zien hun eigen rooster en dat van hun collega's, en kunnen verlof aanvragen.

Er is ook een desktop versie (Tauri) en je kan de webversie als app op je telefoon zetten.

## Gebruikt

- Spring Boot 3 (Java 17), Spring Security met JWT
- H2 voor lokaal, PostgreSQL voor productie
- Lit + Vite voor de frontend
- Tauri 2 voor de desktop app

## Lokaal draaien

Backend (start op poort 8080 met een H2 database met testdata):

```
./mvnw spring-boot:run
```

Frontend, in een tweede terminal:

```
cd frontend
npm install
npm run dev
```

Daarna naar http://localhost:5173. Inloggen gaat met een code en wachtwoord, de testaccounts hebben allemaal `Welkom@123` als wachtwoord:

| code   | rol        |
|--------|------------|
| 000001 | manager    |
| 000003 | medewerker |

Desktop app (Rust nodig):

```
cd frontend
npm run tauri dev
```

## Productie

Met het `prod` profiel gebruikt hij PostgreSQL. Zet dan deze env vars:

- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET` (lange random string)

De Dockerfile bouwt frontend en backend in een keer. Bij de eerste start wordt een admin account aangemaakt, het wachtwoord staat in de logs. Verander die meteen.

## Licentie

MIT, zie [LICENSE](LICENSE).
