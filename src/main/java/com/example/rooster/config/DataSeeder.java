package com.example.rooster.config;

import com.example.rooster.entity.Location;
import com.example.rooster.entity.Shift;
import com.example.rooster.entity.User;
import com.example.rooster.repository.LocationRepository;
import com.example.rooster.repository.ShiftRepository;
import com.example.rooster.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Profile("dev")
@Component
public class DataSeeder implements CommandLineRunner {

    private final LocationRepository locationRepo;
    private final UserRepository userRepo;
    private final ShiftRepository shiftRepo;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(LocationRepository locationRepo, UserRepository userRepo,
                      ShiftRepository shiftRepo, PasswordEncoder passwordEncoder) {
        this.locationRepo = locationRepo;
        this.userRepo = userRepo;
        this.shiftRepo = shiftRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) return; // al geseeded

        Location centrum = locationRepo.save(new Location("Centrum"));
        Location noord   = locationRepo.save(new Location("Noord"));
        Location zuid    = locationRepo.save(new Location("Zuid"));

        createUser("manager", "Sanne de Boer", User.Role.EMPLOYER);
        createUser("admin",   "Admin",          User.Role.EMPLOYER);

        User emp1 = createUser("thomas.bakker", "Thomas Bakker",  User.Role.EMPLOYEE);
        User emp2 = createUser("lisa.jansen",   "Lisa Jansen",    User.Role.EMPLOYEE);
        User emp3 = createUser("bas.de.vries",  "Bas de Vries",   User.Role.EMPLOYEE);
        User emp4 = createUser("mike.visser",   "Mike Visser",    User.Role.EMPLOYEE);
        User emp5 = createUser("anna.berg",     "Anna Berg",      User.Role.EMPLOYEE);
        User emp6 = createUser("kevin.smit",    "Kevin Smit",     User.Role.EMPLOYEE);
        User emp7 = createUser("sander.wolf",   "Sander Wolf",    User.Role.EMPLOYEE);
        User emp8 = createUser("femke.klein",   "Femke Klein",    User.Role.EMPLOYEE);
        User emp9 = createUser("roos.hendriks", "Roos Hendriks",  User.Role.EMPLOYEE);

        LocalDate monday = LocalDate.now().with(java.time.DayOfWeek.MONDAY);

        seedWeek(monday,              emp1, emp2, emp3, centrum);
        seedWeek(monday,              emp4, emp5, emp6, noord);
        seedWeek(monday,              emp7, emp8, emp9, zuid);
        seedWeek(monday.plusWeeks(1), emp1, emp2, emp3, centrum);
        seedWeek(monday.plusWeeks(1), emp4, emp5, emp6, noord);
        seedWeek(monday.plusWeeks(1), emp7, emp8, emp9, zuid);
    }

    private User createUser(String username, String fullName, User.Role role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode("Welkom@123"));
        user.setFullName(fullName);
        user.setRole(role);
        return userRepo.save(user);
    }

    private void seedWeek(LocalDate monday, User a, User b, User c, Location loc) {
        LocalTime open     = LocalTime.of(9,  0);
        LocalTime closeWd  = LocalTime.of(18, 0); // ma t/m vr
        LocalTime closeSat = LocalTime.of(17, 0); // zaterdag

        // Maandag
        addShift(a, loc, monday,             open, closeWd);
        addShift(b, loc, monday,             open, closeWd);
        // Dinsdag
        addShift(b, loc, monday.plusDays(1), open, closeWd);
        addShift(c, loc, monday.plusDays(1), open, closeWd);
        // Woensdag
        addShift(a, loc, monday.plusDays(2), open, closeWd);
        addShift(c, loc, monday.plusDays(2), open, closeWd);
        // Donderdag
        addShift(a, loc, monday.plusDays(3), open, closeWd);
        addShift(b, loc, monday.plusDays(3), open, closeWd);
        // Vrijdag
        addShift(b, loc, monday.plusDays(4), open, closeWd);
        addShift(c, loc, monday.plusDays(4), open, closeWd);
        // Zaterdag
        addShift(a, loc, monday.plusDays(5), open, closeSat);
        addShift(c, loc, monday.plusDays(5), open, closeSat);
        // Zondag: gesloten
    }

    private void addShift(User emp, Location loc, LocalDate date, LocalTime start, LocalTime end) {
        Shift s = new Shift();
        s.setEmployee(emp);
        s.setLocation(loc);
        s.setDate(date);
        s.setStartTime(start);
        s.setEndTime(end);
        shiftRepo.save(s);
    }
}
