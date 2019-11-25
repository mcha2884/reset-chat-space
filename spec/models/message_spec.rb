it 'is invalid without group_id' do
  message = build(:message, group_id: nil)
  message.valid?
  expect(message.errors[:group]).to include('を入力してください')
end

it 'is invaid without user_id' do
  message = build(:message, user_id: nil)
  message.valid?
  expect(message.errors[:user]).to include('を入力してください')
end