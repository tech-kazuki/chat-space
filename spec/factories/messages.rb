FactoryBot.define do

  factory :message do
    content   {Faker::Lorem.sentence}
    image     {File.open("#{Rails.root}/spec/test_uploads/no_image.jpg")}
    user
    group
  end

end
