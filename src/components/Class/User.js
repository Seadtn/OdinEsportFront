class User{
    constructor(email,password,firstName,lastName,country,number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.country = country;
        this.number = number;
        this.password = password;
        this.getEmail = function() {
            return this.email;
        }
        this.getPassword = function() {
            return this.password;
        }
    }
    
}