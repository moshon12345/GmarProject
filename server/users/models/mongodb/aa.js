const schema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
 email: {
  type: String,
  unique: true,
  lowercase: true,
  trim: true,
 },
 firstBadLogIn: {
  type: String,
 },
 secondBadLogin: {
  type: String,
 },
 thirdBadLogin: {
  type: String,
 },
 calculate: {
  type: String,
 }
});
const TestModel = mongoose.model('Test', schema);