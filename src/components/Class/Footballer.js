class Footballer extends User{
    constructor(position,image,certificate) {
        super();
        this.position = position;
        this.image = image;
        this.certificate = certificate;
        this.getPosition = function() {
            return this.position;
        }
        this.getImage = function() {
            return this.image;
        }
        this.getCertificate = function() {
            return this.certificate;
        }
    }
}