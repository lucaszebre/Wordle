-- AlterTable
ALTER TABLE "LetterModel" ALTER COLUMN "representation" DROP NOT NULL,
ALTER COLUMN "representation" SET DEFAULT '{"document": {"sections": [{"style": {"texture": "dots", "line_count": {"max": 4, "min": 2}, "text_color": "black", "background_color": "light_green"}, "title": "Introduction", "guidelines": "Introduce yourself and state the purpose of your message. Keep it concise but informative."}, {"style": {"texture": "dots", "line_count": {"max": 10, "min": 5}, "text_color": "black", "background_color": "light_orange"}, "title": "Body", "guidelines": "Explain the motivation behind your communication and what the recipient stands to gain or learn from it. Provide clear examples or reasons."}, {"style": {"texture": "dots", "line_count": {"max": 3, "min": 1}, "text_color": "black", "background_color": "light_red"}, "title": "Conclusion", "guidelines": "Conclude with a clear call to action, encouraging the recipient to respond or engage further. Make your final remarks impactful."}]}}';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "default_model_id" TEXT;
