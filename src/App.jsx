import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  Smile,
  ShoppingCart,
  Terminal,
  Settings2,
  Zap,
  Star,
} from "lucide-react";
import botImg from "./assets/bot-mascot.png";
import "./App.css";

// Framer Motion анимация для появления элементов (например, пузыря)
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

// Компонент с эффектом падающих букв (Matrix Rain)
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters = "Love❤️contact";
    const fontSize = 10; 
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#0F0"; // цвет
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() < 0.3) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.7; 
      }
    }

    const intervalId = setInterval(draw, 100);

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

export default function App() {
  const [showBubble, setShowBubble] = useState(false);
  const [showModal, setShowModal] = useState(false); // Флаг для модального окна

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Функция открытия/закрытия модального окна
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen text-gray-200 overflow-hidden">
      {/* Фон с эффектом падающих букв (Matrix Rain) */}
      <MatrixRain />

      {/* Основное содержимое (с z-index выше фона) */}
      <div className="relative z-10">
        {/* HERO секция */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="py-20 px-4 flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left"
        >
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold text-orange-500 mb-4 drop-shadow">
              Тёплый контакт
            </h1>
            <p className="text-xl mb-6">Бот, который продаёт с душой 🤖❤️</p>
            {/* Кнопка, которая открывает модальное окно */}
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
              onClick={toggleModal}
            >
              Попробовать бесплатно
            </button>
          </div>
          <div className="relative">
            <img
              src={botImg}
              alt="Тёплый бот"
              className="w-60 md:w-72 drop-shadow-lg hover:scale-105 transition"
            />
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-8 -right-2 bg-gray-700 px-4 py-2 rounded-2xl shadow-lg border border-gray-600 text-sm w-64"
              >
                <p className="text-gray-100">
                  Привет! Я помогу вам выбрать идеальный подарок 🎁
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Секция "Как работает" */}
        <section className="py-16 px-4 max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
             { text: "Клиент пишет", icon: MessageCircle },
             { text: "Бот отвечает", icon: Bot },
             { text: "Бот предлагает", icon: Smile },
             { text: "Клиент оплачивает", icon: ShoppingCart },
           ].map(({ text, icon: Icon }, i) => (
             <motion.div
               key={i}
               custom={i}
               initial="hidden"
               animate="visible"
               variants={fadeIn}
               /** Добавляем анимацию при наведении */
               whileHover={{
                 scale: 1.08,
                 rotate: 2,
                 boxShadow: "0px 0px 10px rgba(255, 165, 0, 0.5)",
               }}
               transition={{ type: "spring", stiffness: 150 }} // Параметры перехода
               className="bg-gray-800 p-6 rounded-2xl shadow-md text-center font-semibold flex flex-col items-center cursor-pointer"
             >
               <Icon className="w-8 h-8 mb-2 text-orange-400" />
               <span className="text-gray-100">{text}</span>
             </motion.div>
           
          ))}
        </section>

        {/* Примеры общения */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 px-6 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-orange-400">
            Примеры общения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [
                { role: "Клиент", text: "Привет, делаете портреты по фото?" },
                {
                  role: "Бот",
                  text: "Привет! Да, конечно. Для кого планируете подарок? 🎁",
                },
                { role: "Клиент", text: "Для парня, хочу в стиле комикса" },
                {
                  role: "Бот",
                  text: "Отлично! Могу показать 2 примера. Пришлите фото 🙌",
                },
              ],
              [
                { role: "Клиент", text: "Здравствуйте, у вас можно заказать букет?" },
                {
                  role: "Бот",
                  text: "Добрый день! Конечно. Расскажите, для какого повода?",
                },
                { role: "Клиент", text: "На день рождения, для девушки" },
                {
                  role: "Бот",
                  text: "Понял! Рекомендую букет «Розовое настроение». Добавить открытку? 💌",
                },
              ],
              [
                { role: "Клиент", text: "Добрый день! Вы устанавливаете кондиционеры?" },
                {
                  role: "Бот",
                  text: "Привет! Да, работаем по городу и району. Где вы находитесь?",
                },
                {
                  role: "Клиент",
                  text: "Псков,Рижский 56А  2-комнатная квартира",
                },
                {
                  role: "Бот",
                  text: "Отлично! Мастер свободен завтра после 15:00. Подойдёт?",
                },
              ],
            ].map((dialog, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-xl shadow p-4 space-y-3 text-left text-sm border border-gray-700"
              >
                {dialog.map((line, i) => (
                  <p key={i}>
                    <strong
                      className={line.role === "Бот" ? "text-orange-400" : "text-gray-200"}
                    >
                      {line.role}:
                    </strong>{" "}
                    {line.text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Отзывы клиентов */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 px-4 bg-gray-900 border-t border-gray-700"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-orange-400">
            Отзывы клиентов
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Аня, студия портретов",
                text: "Бот отвечает быстрее, чем я успеваю прочитать сообщение. У нас +40% заказов!",
              },
              {
                name: "Игорь, тату-мастер",
                text: "Теперь я могу спокойно работать, а бот сам ведёт клиента до записи.",
              },
              {
                name: "Марина, флорист",
                text: "Никто не игнорируется, даже ночью. Очень тёплая подача!",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="p-4 bg-gray-800 rounded-xl shadow text-gray-200 border border-gray-700"
              >
                <Star className="text-orange-400 mb-2" />
                <p className="italic mb-2">"{review.text}"</p>
                <p className="font-semibold">— {review.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Как подключить */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 px-6 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-orange-400">
            Как подключить за 3 минуты
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Terminal, text: "Оставьте заявку" },
              { icon: Settings2, text: "Мы настроим и подключим бота к вашему чату" },
              { icon: Zap, text: "Начинайте получать заявки 🚀" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-gray-800 p-4 rounded-2xl shadow flex flex-col items-center border border-gray-700"
              >
                <Icon className="w-10 h-10 text-orange-400 mb-2" />
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Форма */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-gray-900 py-12 px-4 shadow-inner border-t border-gray-700"
        >
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-center mb-4 text-orange-400">
              Получите демо-бота
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Ссылка на ваш профиль"
                className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl font-semibold transition"
              >
                Отправить
              </button>
            </form>
          </div>
        </motion.section>

        {/* Футер */}
        <footer className="text-center text-sm text-gray-300 py-6 bg-gray-900 border-t border-gray-700">
          © {new Date().getFullYear()} Тёплый контакт. Сделано с заботой 🤝
        </footer>
      </div>

      {/* Модальное окно (появляется при showModal === true) */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={toggleModal}
        >
          {/* Останавливаем всплытие клика, чтобы не закрывать модал при клике внутри него */}
          <div
            className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl max-w-md w-full mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-orange-400 mb-4">Заполните данные</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Ваш телефон/мессенджер"
                className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl font-semibold transition"
              >
                Отправить
              </button>
            </form>
            {/* Кнопка "Закрыть" */}
            <button
              className="mt-4 inline-block text-sm text-gray-400 hover:text-gray-200"
              onClick={toggleModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
