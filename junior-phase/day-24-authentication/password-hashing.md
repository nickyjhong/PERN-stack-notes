# Bcrypt / Password Hashing
[⬅ Go Back](/week6.md)

## Notes

[Bcrypt Demo](./bcrypt-demo.js)

[JWT and Bcrypt Demo](/junior-phase/day-24-authentication/jwt-bcrypt-demo/)
- Password hashing is SLOW
- The number parameter in hash determines how long the request takes, it ramps up extremely so 15 is as high as you probably want, and you need to use an async function for it
- When a user creates their account, we odn't want to store their password in plain text
  - Convert password
- Salt count
  - This number is essentially, "how long should it take to log in"
    - More rounds === more time to hash/compare
  - The idea is that if a login takes a little extra time (like 1 second instead of .2sec) then it doesn't really slow down a user but would slow down someone who is using programming to guess thousands of passwords
  - Salts are randomly generated when the password is initially hashed
    - That's why if you hash more than once you get different results
    - Salt count standard is 10-14
    - As computers get faster and faster, we can increase that number to keep up with new speeds of computation
    - If you change that number, then ALL the passwords become invalid (since they were made with one less salt round) so you would need to update all of them (ie. make users reset their passwords)
