import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

interface WelcomeScreenProps {
  onEnter: () => void
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      >
        {/* Декоративные линии */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute top-[28%] left-0 right-0 h-px bg-white/5 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute top-[72%] left-0 right-0 h-px bg-white/5 origin-right"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute left-[15%] top-0 bottom-0 w-px bg-white/5 origin-top"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute right-[15%] top-0 bottom-0 w-px bg-white/5 origin-bottom"
          />
        </div>

        {/* Основной контент */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">

          {/* Лейбл сверху */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/30 text-xs tracking-[0.3em] uppercase mb-8"
          >
            Справочник для съёмки
          </motion.p>

          {/* Главный заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="font-serif text-5xl md:text-7xl font-light text-white leading-tight mb-4"
          >
            Позы для
            <br />
            <span className="italic">каталогов</span>
          </motion.h1>

          {/* Разделитель */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="w-12 h-px bg-white/40 mb-6"
          />

          {/* Описание */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-white/50 text-sm md:text-base leading-relaxed mb-12 font-light"
          >
            30 референсов для моделей и фотографов.<br className="hidden md:block" />
            Три категории: стоя, сидя, лёжа.
          </motion.p>

          {/* Кнопка входа */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="group flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full text-white text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-400"
          >
            Смотреть позы
            <Icon name="ArrowRight" size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>

          {/* Теги */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex gap-4 mt-10"
          >
            {["Стоя · 10 поз", "Сидя · 8 поз", "Лёжа · 8 поз"].map((tag) => (
              <span key={tag} className="text-white/20 text-xs tracking-wider">{tag}</span>
            ))}
          </motion.div>
        </div>

        {/* Угловые декорации */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/15" />
        <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/15" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/15" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/15" />
      </motion.div>
    </AnimatePresence>
  )
}
