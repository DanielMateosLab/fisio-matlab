# Tips to improve code

## Testing

1. Write tests BEFORE code (Test Driven Development)
2. Try to write less integration tests and more unit tests.

# Set up and settings

## Docker mongoDB set up

In order to set up the replica sets:

```
docker-compose up -d &&
docker-compose exec rs1 mongo

...

> rs.initiate({
  "_id" : "replSet",
  "members" : [
    {
      "_id" : 0,
      "host" : "rs1:27017"
    },
    {
      "_id" : 1,
      "host" : "rs2:27017"
    },
    {
      "_id" : 2,
      "host" : "rs3:27017"
    }
  ]}
)
```

Note that this set up is a basic set up just for testing as it has not authentication or security settings.
