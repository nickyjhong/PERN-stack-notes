const bcrypt = require('bcrypt')

const demo = async() => {
  // 5 is a reasonable number
  const hashedPassword = await bcrypt.hash('correcthorce', 5);
  console.log(hashedPassword)

  const isValid = await bcrypt.compare('correcthorse', hashedPassword)
  console.log(isValid)  // true

  const notValid = await bcrypt.compare('wronghorse', hashedPassword)
  console.log(notValid) // false
}

demo()