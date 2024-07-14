print("Starting init script...");

db = db.getSiblingDB('tech-challenge-fiap-test');
print("Switched to tech-challenge-fiap database");

db.createUser({
  user: 'fiap',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'tech-challenge-fiap-test'
    }
  ]
});

print("User fiap created with readWrite role on tech-challenge-fiap database");

db.initialization.insertOne({
  message: 'Database has been initialized',
  timestamp: new Date()
});

print("Inserted initial document into initialization collection");