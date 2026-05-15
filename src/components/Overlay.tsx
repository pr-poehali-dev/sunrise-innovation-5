import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { jsPDF } from "jspdf"

type Category = "standing" | "sitting" | "lying"

const CDN = "https://cdn.poehali.dev/projects/64ce6965-fcc2-46b7-be6c-95f6cb962f5c/files"

const poses = {
  standing: [
    {
      name: "Прямая классика",
      photo: `${CDN}/5dc0d39e-a04f-4c79-99c4-2cd4030afd0c.jpg`,
      accent: "Силуэт и посадка плеч",
      description: "Встань прямо, ноги на ширине бёдер, стопы параллельны. Руки свободно опущены вдоль тела, ладони развёрнуты к камере. Взгляд строго в объектив, подбородок чуть приподнят. Плечи расправлены, шея вытянута.",
      tip: "Расправь плечи и чуть вытяни шею вверх. Перенеси вес на одну ногу для живости.",
      photographer: "Фронтальный ракурс, равномерный студийный свет."
    },
    {
      name: "Одна рука в кармане",
      photo: `${CDN}/0168435b-6eba-4a9f-b40a-ed17c95adb5c.jpg`,
      accent: "Посадка брюк и силуэт бедра",
      description: "Стой прямо, одна рука в кармане, другая свободно вдоль тела. Бедро слегка выдвинуто в сторону руки в кармане. Взгляд в камеру или чуть в сторону. Ноги вместе или одна слегка впереди.",
      tip: "Не сжимай руку в кулак в кармане — пусть лежит свободно. Чуть согни колено опорной ноги.",
      photographer: "Ракурс 3/4, боковой рисующий свет."
    },
    {
      name: "Поворот в профиль",
      photo: `${CDN}/1d7fcb58-164d-4176-a7d7-5127ebecd7c9.jpg`,
      accent: "Длина и крой изделия сбоку",
      description: "Поверни корпус на 90° к камере, голова повёрнута к объективу через плечо. Руки вдоль тела или одна согнута у талии. Ноги прямые, стопы направлены в сторону поворота корпуса.",
      tip: "Подними подбородок и посмотри в камеру уверенно. Не горбись — вытянись вверх.",
      photographer: "Чёткий профиль или 3/4, боковой свет подчёркивает линии."
    },
    {
      name: "Перекрещённые ноги",
      photo: `${CDN}/f6bf4289-9bff-4496-a9bf-7d4c414a2b2c.jpg`,
      accent: "Длина юбки или брюк, форма ноги",
      description: "Стой прямо, одна нога перекрещена перед другой на уровне лодыжек. Руки свободно опущены или скрещены перед собой. Взгляд в камеру, лёгкая улыбка. Корпус ровный, плечи расправлены.",
      tip: "Слегка согни колено передней ноги для динамики. Не напрягай бедра.",
      photographer: "Фронтальный ракурс, мягкий рассеянный свет."
    },
    {
      name: "Руки у лица",
      photo: `${CDN}/5dc0d39e-a04f-4c79-99c4-2cd4030afd0c.jpg`,
      accent: "Воротник, детали верха и рукав",
      description: "Встань прямо, одна или обе руки подняты к лицу — касаются подбородка, щеки или поправляют волосы. Локти направлены вниз. Взгляд задумчив или в сторону. Ноги вместе, корпус ровный.",
      tip: "Держи пальцы расслабленными, не сжимай. Слегка наклони голову для мягкости.",
      photographer: "Поясной кадр или 3/4, акцентный свет на верх."
    },
    {
      name: "Шаг вперёд",
      photo: `${CDN}/0168435b-6eba-4a9f-b40a-ed17c95adb5c.jpg`,
      accent: "Динамика силуэта, движение ткани",
      description: "Сделай полшага вперёд одной ногой, корпус чуть наклонён вперёд. Руки в движении — одна впереди, другая сзади. Взгляд в камеру или чуть вниз. Имитация уверенной ходьбы.",
      tip: "Смотри уверенно, не в пол. Двигайся плавно, не дёргайся.",
      photographer: "Динамичный ракурс 3/4, широкий угол, съёмка в движении."
    },
    {
      name: "Скрещённые руки",
      photo: `${CDN}/f6bf4289-9bff-4496-a9bf-7d4c414a2b2c.jpg`,
      accent: "Объём рукавов, фактура ткани верха",
      description: "Встань прямо, руки скрещены на уровне груди — не плотно, а свободно. Одна рука поверх другой, пальцы расслаблены. Ноги на ширине плеч. Взгляд прямой, выражение уверенное.",
      tip: "Не прижимай локти к телу — держи их чуть отведёнными. Расправь спину.",
      photographer: "Фронтальный ракурс, студийный свет с двух сторон."
    },
    {
      name: "Спиной к камере",
      photo: `${CDN}/1d7fcb58-164d-4176-a7d7-5127ebecd7c9.jpg`,
      accent: "Спина изделия, застёжки, посадка сзади",
      description: "Стой спиной к камере, ноги вместе или чуть расставлены. Голова повёрнута через плечо к объективу. Руки вдоль тела или одна на бедре. Спина прямая, лопатки сведены.",
      tip: "Убери волосы с воротника, если это важно для изделия. Подними подбородок при взгляде через плечо.",
      photographer: "Ракурс строго сзади или 3/4 сзади, акцент на спину."
    },
    {
      name: "Облокотившись о стену",
      photo: `${CDN}/5dc0d39e-a04f-4c79-99c4-2cd4030afd0c.jpg`,
      accent: "Прилегание изделия, боковой силуэт",
      description: "Прислонись плечом или лопаткой к стене. Одна нога согнута в колене, стопа прижата к стене. Руки расслаблены вдоль тела или скрещены. Взгляд в сторону или в камеру.",
      tip: "Не напрягай плечи — опирайся естественно. Расслабь лицо и чуть приоткрой губы.",
      photographer: "Боковой или диагональный ракурс, направленный свет."
    },
    {
      name: "Поднятые руки",
      photo: `${CDN}/0168435b-6eba-4a9f-b40a-ed17c95adb5c.jpg`,
      accent: "Длина рукава, детали проймы и плеча",
      description: "Подними руки вверх — обе или одну. Можно держаться за голову, волосы или тянуться вверх. Взгляд вверх или в камеру. Корпус вытянутый, ноги прямые или одна слегка согнута.",
      tip: "Не напрягай плечи к ушам — тяни вверх через макушку. Сохраняй лёгкость движения.",
      photographer: "Фронтальный или ракурс снизу вверх, акцент на верхнюю зону."
    }
  ],
  sitting: [
    {
      name: "На краю стула",
      photo: `${CDN}/15596972-bcc6-42ba-816c-0d96e4fccc7c.jpg`,
      accent: "Посадка брюк, форма бедра и колена",
      description: "Сядь на край стула, не опираясь на спинку. Ноги вместе, колени сведены. Руки на коленях или одна опущена вниз. Спина прямая, плечи расправлены. Взгляд в камеру, голова ровно.",
      tip: "Не горбись — держи спину прямо без опоры. Слегка напряги пресс для осанки.",
      photographer: "Фронтальный или 3/4, ракурс на уровне модели."
    },
    {
      name: "Нога на ногу",
      photo: `${CDN}/d75a8a2f-47ad-4156-9e84-dd4baa4a1453.jpg`,
      accent: "Длина юбки или брюк, форма ноги",
      description: "Сядь удобно, закинь одну ногу на другую. Руки на бедре или одна на колене. Корпус слегка наклонён вперёд или прямо. Взгляд в камеру или чуть в сторону. Спина прямая.",
      tip: "Не сутулься при закинутой ноге. Пусть верхняя нога лежит свободно, без напряжения.",
      photographer: "3/4 ракурс, акцент на нижнюю часть, боковой свет."
    },
    {
      name: "Сидя на полу",
      photo: `${CDN}/b46412d0-0184-47b3-bcc2-495dca35f58f.jpg`,
      accent: "Общий силуэт, длина и объём низа",
      description: "Сядь на пол, ноги вытянуты вперёд или одна согнута. Руки опираются на пол сзади или лежат на коленях. Корпус прямой, взгляд в камеру или вверх. Плечи расправлены.",
      tip: "Тянись макушкой вверх даже сидя — не оседай. Найди красивое положение рук.",
      photographer: "Ракурс чуть сверху или фронтальный, мягкое рассеянное освещение."
    },
    {
      name: "Подтянутые колени",
      photo: `${CDN}/15596972-bcc6-42ba-816c-0d96e4fccc7c.jpg`,
      accent: "Силуэт брюк, длина и крой штанин",
      description: "Сядь на пол, подтяни колени к груди. Руки обхватывают голени или лежат на коленях. Голова слегка наклонена или прямо, взгляд в камеру. Спина ровная или с лёгким изгибом.",
      tip: "Не зарывайся подбородком в колени — держи голову поднятой. Расслабь плечи.",
      photographer: "Фронтальный ракурс или слегка сбоку, мягкий свет сверху."
    },
    {
      name: "Боком на стуле",
      photo: `${CDN}/d75a8a2f-47ad-4156-9e84-dd4baa4a1453.jpg`,
      accent: "Боковой крой изделия, посадка плеча",
      description: "Сядь боком на стул, повернувшись к камере. Ноги свешены вбок или одна стоит на земле. Руки на подлокотнике или на спинке стула. Взгляд через плечо или прямо на камеру.",
      tip: "Вытянись вверх, не оседай на бок. Поверни плечи к камере для раскрытия силуэта.",
      photographer: "Боковой или 3/4 ракурс, направленный свет со стороны камеры."
    },
    {
      name: "Опираясь на руку",
      photo: `${CDN}/b46412d0-0184-47b3-bcc2-495dca35f58f.jpg`,
      accent: "Рукав, плечо и верх изделия",
      description: "Сядь, опершись щекой или подбородком на руку. Локоть стоит на колене или подлокотнике. Другая рука свободна вдоль тела. Взгляд задумчив или в камеру. Плечо опорной руки чуть приподнято.",
      tip: "Не дави слишком сильно на щеку — лицо не должно деформироваться. Расслабь взгляд.",
      photographer: "Поясной кадр, ракурс 3/4, мягкий боковой свет на лицо."
    },
    {
      name: "Развёрнутая поза",
      photo: `${CDN}/d75a8a2f-47ad-4156-9e84-dd4baa4a1453.jpg`,
      accent: "Спина и задняя часть изделия",
      description: "Сядь на стул или куб, повернись к камере спиной в 3/4. Голова повёрнута через плечо к объективу. Руки на спинке стула или на бёдрах. Спина прямая, лопатки сведены.",
      tip: "Полностью выпрями спину — осанка в этой позе главное. Улыбнись глазами при взгляде через плечо.",
      photographer: "Ракурс 3/4 сзади или сбоку, акцент на спину изделия."
    },
    {
      name: "Скрестив ноги",
      photo: `${CDN}/b46412d0-0184-47b3-bcc2-495dca35f58f.jpg`,
      accent: "Длина и объём низа изделия",
      description: "Сядь на пол, скрести ноги. Руки лежат на коленях или вытянуты вперёд на полу. Спина прямая, взгляд в камеру или чуть вниз. Плечи расслаблены и опущены вниз.",
      tip: "Следи за осанкой — в этой позе легко сутулиться. Дышать ровно помогает расслабиться.",
      photographer: "Фронтальный ракурс чуть сверху, мягкое студийное освещение."
    }
  ],
  lying: [
    {
      name: "На спине, руки вдоль",
      photo: `${CDN}/7f7594f3-fc77-45a1-a43d-97e9fafcc5f4.jpg`,
      accent: "Общий силуэт изделия, длина",
      description: "Ляг на спину, ноги прямые или чуть согнуты в коленях. Руки вдоль тела или на животе. Голова прямо, взгляд вверх или в камеру (если съёмка сверху). Тело ровное, естественное.",
      tip: "Вытяни носки ног для удлинения силуэта. Расслабь живот и дыши спокойно.",
      photographer: "Съёмка сверху (overhead), равномерный мягкий свет."
    },
    {
      name: "На боку, опора на локоть",
      photo: `${CDN}/593bd625-7747-419d-96b7-e5f1699c5ae6.jpg`,
      accent: "Боковой силуэт, талия и бедро",
      description: "Ляг на бок, опираясь на локоть. Верхняя часть тела приподнята. Ноги вместе или чуть согнуты. Рука опирается на бедро. Взгляд в камеру, голова держится уверенно.",
      tip: "Не прогибай запястье — держи руку ровно. Слегка прогни поясницу для подчёркивания талии.",
      photographer: "Фронтальный ракурс на уровне модели, боковой контровой свет."
    },
    {
      name: "На животе, голова в руках",
      photo: `${CDN}/35708e23-0ca0-4c50-beb5-523a06db5c75.jpg`,
      accent: "Спина и задняя часть изделия",
      description: "Ляг на живот, подними корпус, опершись на локти. Подбородок в ладонях или руки скрещены перед собой. Ноги согнуты в коленях или вытянуты. Взгляд в камеру, лёгкая улыбка.",
      tip: "Слегка прогнись в пояснице для красивой дуги спины. Локти не разводи слишком широко.",
      photographer: "Ракурс слегка сверху и фронтально, мягкое освещение спереди."
    },
    {
      name: "Полуоборот на боку",
      photo: `${CDN}/593bd625-7747-419d-96b7-e5f1699c5ae6.jpg`,
      accent: "Крой плеча и рукава, боковые линии",
      description: "Ляг на бок в полуповороте: нижнее плечо на полу, верхнее чуть приподнято. Ноги вместе или одна согнута. Верхняя рука на бедре или вытянута вперёд. Взгляд в камеру через плечо.",
      tip: "Удерживай равновесие через корпус, не заваливайся. Напряги мышцы кора для устойчивости.",
      photographer: "Ракурс 3/4, боковой направленный свет, тени подчёркивают форму."
    },
    {
      name: "Вытянутая поза",
      photo: `${CDN}/7f7594f3-fc77-45a1-a43d-97e9fafcc5f4.jpg`,
      accent: "Длина изделия, вертикальный силуэт",
      description: "Ляг на спину, вытяни всё тело в одну линию. Руки вдоль тела или вытянуты над головой. Ноги ровные, носки вытянуты. Голова прямо, взгляд вверх. Максимально длинный силуэт.",
      tip: "Тянись пятками и макушкой одновременно. Не поднимай плечи к ушам при вытянутых руках.",
      photographer: "Overhead-съёмка, равномерное рассеянное освещение по всей длине."
    },
    {
      name: "Согнутые колени набок",
      photo: `${CDN}/35708e23-0ca0-4c50-beb5-523a06db5c75.jpg`,
      accent: "Объём и форма низа изделия",
      description: "Ляг на спину, согни колени и положи обе ноги набок. Руки вдоль тела или одна за головой. Взгляд вверх или к камере. Корпус остаётся прямым, ноги повёрнуты в одну сторону.",
      tip: "Держи плечи на полу при повороте ног. Расслабь шею и нижнюю челюсть.",
      photographer: "Overhead или под углом 45°, мягкий студийный свет."
    },
    {
      name: "На боку, ноги согнуты",
      photo: `${CDN}/593bd625-7747-419d-96b7-e5f1699c5ae6.jpg`,
      accent: "Изгиб силуэта, посадка бёдер",
      description: "Ляг на бок, согни колени под углом 90°. Нижняя рука вытянута под головой, верхняя на бедре или на полу перед собой. Взгляд в камеру, тело образует мягкую S-линию.",
      tip: "Слегка прогни поясницу для красивого изгиба. Верхнюю ногу можно чуть выдвинуть вперёд.",
      photographer: "Фронтальный ракурс на уровне модели, контровой боковой свет."
    },
    {
      name: "Поза отдыха",
      photo: `${CDN}/35708e23-0ca0-4c50-beb5-523a06db5c75.jpg`,
      accent: "Естественное прилегание и фактура ткани",
      description: "Ляг на бок в расслабленной естественной позе. Руки под головой или перед собой. Ноги чуть согнуты, одна поверх другой. Взгляд мечтательный, в сторону или в камеру. Атмосферная поза.",
      tip: "Полностью расслабь тело — напряжение читается на фото. Дыши глубоко перед кадром.",
      photographer: "Ракурс 3/4 или сбоку, тёплый мягкий свет, атмосферная тень."
    }
  ]
}

const categoryLabels: Record<Category, string> = {
  standing: "Стоя",
  sitting: "Сидя",
  lying: "Лёжа"
}

const categoryIcons: Record<Category, string> = {
  standing: "PersonStanding",
  sitting: "Armchair",
  lying: "BedDouble"
}

export default function Overlay() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [activePoseIndex, setActivePoseIndex] = useState(0)

  const activePoses = activeCategory ? poses[activeCategory] : null
  const activePose = activePoses ? activePoses[activePoseIndex] : null

  const handleCategoryClick = (cat: Category) => {
    if (activeCategory === cat) {
      setActiveCategory(null)
    } else {
      setActiveCategory(cat)
      setActivePoseIndex(0)
    }
  }

  const generatePDF = () => {
    if (!activeCategory) return
    const list = poses[activeCategory]
    const label = categoryLabels[activeCategory]

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageW = doc.internal.pageSize.getWidth()
    const margin = 18
    const contentW = pageW - margin * 2
    let y = 22

    const addText = (text: string, size: number, style: "normal" | "bold" | "italic", color: [number, number, number], lineH: number, maxW?: number) => {
      doc.setFontSize(size)
      doc.setFont("helvetica", style)
      doc.setTextColor(...color)
      const lines = doc.splitTextToSize(text, maxW ?? contentW)
      doc.text(lines, margin, y)
      y += lines.length * lineH
    }

    const checkPage = (needed: number) => {
      if (y + needed > 275) {
        doc.addPage()
        y = 22
      }
    }

    // Title
    doc.setFillColor(10, 10, 10)
    doc.rect(0, 0, pageW, 16, "F")
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text(`Позы для каталогов — ${label}`, margin, 11)
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(160, 160, 160)
    doc.text("poseref.ru · 30 референсов для моделей и фотографов", pageW - margin, 11, { align: "right" })
    y = 28

    list.forEach((pose, i) => {
      checkPage(52)

      // Pose number + name
      doc.setDrawColor(220, 220, 220)
      doc.setLineWidth(0.3)
      doc.line(margin, y - 2, pageW - margin, y - 2)
      y += 2

      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(160, 160, 160)
      doc.text(`${String(i + 1).padStart(2, "0")}`, margin, y)

      doc.setFontSize(13)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(20, 20, 20)
      doc.text(pose.name, margin + 8, y)
      y += 6

      // Accent
      doc.setFontSize(8)
      doc.setFont("helvetica", "italic")
      doc.setTextColor(100, 100, 100)
      doc.text(`Акцент: ${pose.accent}`, margin, y)
      y += 5

      // Description
      addText(pose.description, 9, "normal", [40, 40, 40], 4.5, contentW)
      y += 2

      // Tip
      doc.setFillColor(245, 245, 245)
      const tipLines = doc.splitTextToSize(`Модели: ${pose.tip}`, contentW - 8)
      const photoLines = doc.splitTextToSize(`Фотографу: ${pose.photographer}`, contentW - 8)
      const boxH = (tipLines.length + photoLines.length) * 4 + 8
      checkPage(boxH + 4)
      doc.roundedRect(margin, y, contentW, boxH, 2, 2, "F")
      doc.setFontSize(8)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(80, 80, 80)
      doc.text(tipLines, margin + 4, y + 5)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(100, 100, 100)
      doc.text(photoLines, margin + 4, y + 5 + tipLines.length * 4 + 2)
      y += boxH + 8
    })

    // Footer on last page
    const totalPages = doc.getNumberOfPages()
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p)
      doc.setFontSize(7)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(180, 180, 180)
      doc.text(`Страница ${p} из ${totalPages}`, pageW / 2, 290, { align: "center" })
    }

    doc.save(`позы-${label.toLowerCase()}.pdf`)
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Header */}
      <div className="absolute top-6 left-0 right-0 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center"
        >
          <h1 className="font-serif text-xl md:text-2xl font-light text-white tracking-[0.2em] uppercase">
            Позы для каталогов
          </h1>
          <p className="text-white/50 text-xs tracking-widest mt-1 font-light">
            30 референсов для моделей и фотографов
          </p>
        </motion.div>
      </div>

      {/* Category navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="pointer-events-auto absolute bottom-8 left-0 right-0 flex justify-center gap-3"
      >
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm tracking-wider font-light transition-all duration-300
              ${activeCategory === cat
                ? "bg-white text-black border-white"
                : "bg-black/30 text-white/80 border-white/20 hover:border-white/60 hover:bg-black/50"
              }
              backdrop-blur-sm
            `}
          >
            <Icon name={categoryIcons[cat]} fallback="Circle" size={15} />
            {categoryLabels[cat]}
          </button>
        ))}
      </motion.div>

      {/* Pose panel */}
      <AnimatePresence>
        {activeCategory && activePose && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="pointer-events-auto absolute top-20 right-4 md:right-8 w-[300px] md:w-[340px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col gap-4"
          >
            {/* Category title + pose nav */}
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-xs tracking-widest uppercase">{categoryLabels[activeCategory]}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePoseIndex(i => Math.max(0, i - 1))}
                  disabled={activePoseIndex === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white/60 disabled:opacity-30 transition-all"
                >
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <span className="text-white/50 text-xs">{activePoseIndex + 1} / {activePoses!.length}</span>
                <button
                  onClick={() => setActivePoseIndex(i => Math.min(activePoses!.length - 1, i + 1))}
                  disabled={activePoseIndex === activePoses!.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white/60 disabled:opacity-30 transition-all"
                >
                  <Icon name="ChevronRight" size={14} />
                </button>
              </div>
            </div>

            {/* Pose photo */}
            {activePose.photo && (
              <div className="w-full h-44 rounded-xl overflow-hidden bg-white/5">
                <img
                  src={activePose.photo}
                  alt={activePose.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}

            {/* Pose name */}
            <h2 className="font-serif text-white text-lg leading-tight">{activePose.name}</h2>

            {/* Accent badge */}
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={13} className="text-white/40" />
              <span className="text-white/60 text-xs">{activePose.accent}</span>
            </div>

            {/* Description */}
            <p className="text-white/75 text-sm leading-relaxed">{activePose.description}</p>

            {/* Tips */}
            <div className="border-t border-white/10 pt-3">
              <div className="flex items-start gap-2 mb-2">
                <Icon name="Lightbulb" size={13} className="text-white/40 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Подсказка модели</span>
                  <p className="text-white/70 text-xs leading-relaxed">{activePose.tip}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Camera" size={13} className="text-white/40 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Фотографу</span>
                  <p className="text-white/70 text-xs leading-relaxed">{activePose.photographer}</p>
                </div>
              </div>
            </div>

            {/* Pose dots navigation */}
            <div className="flex gap-1.5 flex-wrap">
              {activePoses!.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePoseIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${i === activePoseIndex ? "bg-white scale-125" : "bg-white/25 hover:bg-white/50"}`}
                />
              ))}
            </div>

            {/* PDF Export */}
            <button
              onClick={generatePDF}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 text-white/80 hover:text-white text-xs tracking-wider transition-all duration-200"
            >
              <Icon name="Download" size={13} />
              Скачать все {activePoses!.length} поз в PDF
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <AnimatePresence>
        {!activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-24 left-0 right-0 flex justify-center"
          >
            <p className="text-white/30 text-xs tracking-widest">
              Выбери категорию · Листай мышью или касанием
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}