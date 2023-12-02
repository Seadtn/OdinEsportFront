class Agent extends User{
    constructor(profile,image,deals) {
        super();
        this.profile = profile;
        this.image = image;
        this.deals = deals;
        this.getProfile = function() {
            return this.profile;
        }
        this.getImage = function() {
            return this.image;
        }
        this.getDeals = function() {
            return this.deals;
        }
    }
}