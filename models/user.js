const mongoose = require("mongoose");
const escape = require("escape-html");

const UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    firstName: { type: String, default: "Анон" },
    lastName: { type: String, default: "Анонов" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    photo: { type: String, default: "" },
    type: { type: String, default: "user" },
    sex: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.statics.getOrCreate = async function(ctx) {
    const { peerId: id, vk } = ctx;
    const userIsExist = await this.findOne({ userId: id });
    if (userIsExist) return userIsExist;

    const [{ first_name = "Анон", last_name = "Анонов", sex, city, country, photo_max }] = await vk.api.users.get({
        user_id: id,
        fields: ["sex", "country", "city", "photo_max"],
    });

    const user = await this.create({
        userId: id,
        sex,
        firstName: escape(first_name),
        lastName: escape(last_name),
        photo: photo_max || "",
        city: city.title || "",
        country: country.title || "",
    });

    return user;
};

module.exports = mongoose.model("User", UserSchema);