import { useState } from "react";
import Icon from "@/components/ui/icon";

const DEPARTMENTS = [
  {
    id: "sales",
    name: "Продажи",
    staffing: 94,
    total: 68,
    plan: 72,
    turnover: 6.1,
    avgSalary: 95000,
    salaryMin: 75000,
    salaryMax: 180000,
    openVacancies: 4,
    avgCloseTime: 28,
    performance: 112,
    newHires: [3, 2, 4, 1, 5, 2, 3, 4, 2, 1, 3, 2],
    kpi: [
      { label: "Выполнение плана продаж", value: 112, unit: "%" },
      { label: "Средний чек", value: 145000, unit: "₽" },
      { label: "Конверсия лидов", value: 18, unit: "%" },
      { label: "Время сделки", value: 21, unit: "дней" },
    ],
    color: "#1A56DB",
  },
  {
    id: "dev",
    name: "Разработка",
    staffing: 78,
    total: 89,
    plan: 114,
    turnover: 14.3,
    avgSalary: 210000,
    salaryMin: 140000,
    salaryMax: 380000,
    openVacancies: 12,
    avgCloseTime: 52,
    performance: 94,
    newHires: [1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 2],
    kpi: [
      { label: "Velocity (story points)", value: 87, unit: "SP" },
      { label: "Bug rate", value: 3.2, unit: "%" },
      { label: "Code review", value: 18, unit: "ч" },
      { label: "Деплоев в месяц", value: 24, unit: "шт" },
    ],
    color: "#7C3AED",
  },
  {
    id: "ops",
    name: "Операции",
    staffing: 91,
    total: 121,
    plan: 133,
    turnover: 7.4,
    avgSalary: 78000,
    salaryMin: 55000,
    salaryMax: 130000,
    openVacancies: 6,
    avgCloseTime: 31,
    performance: 98,
    newHires: [4, 3, 5, 2, 3, 4, 5, 3, 2, 4, 3, 2],
    kpi: [
      { label: "SLA выполнение", value: 98, unit: "%" },
      { label: "Обращений в день", value: 340, unit: "шт" },
      { label: "Время ответа", value: 2.4, unit: "ч" },
      { label: "Удовл. клиентов", value: 4.6, unit: "/5" },
    ],
    color: "#059669",
  },
  {
    id: "hr",
    name: "HR",
    staffing: 100,
    total: 12,
    plan: 12,
    turnover: 0,
    avgSalary: 105000,
    salaryMin: 85000,
    salaryMax: 160000,
    openVacancies: 0,
    avgCloseTime: 0,
    performance: 103,
    newHires: [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    kpi: [
      { label: "Time-to-hire", value: 28, unit: "дней" },
      { label: "eNPS", value: 67, unit: "балл" },
      { label: "Retention Rate", value: 97, unit: "%" },
      { label: "Закрытых вакансий", value: 23, unit: "шт" },
    ],
    color: "#D97706",
  },
];

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

function MetricCard({
  icon,
  label,
  value,
  sub,
  alert = false,
  delay = 0,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  alert?: boolean;
  delay?: number;
}) {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.4s ease-out ${delay}ms forwards`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: alert ? "#FEF2F2" : "#EBF5FF" }}
        >
          <Icon
            name={icon}
            size={20}
            className={alert ? "text-red-600" : "text-blue-700"}
          />
        </div>
        {alert && (
          <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            Выше нормы
          </span>
        )}
      </div>
      <div className={`text-3xl font-bold mb-1 ${alert ? "text-red-600" : "text-slate-900"}`}>
        {value}
      </div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
      {sub && (
        <div className={`text-xs mt-2 ${alert ? "text-red-500" : "text-slate-400"}`}>
          {sub}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ value, color = "#1A56DB" }: { value: number; color?: string }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, backgroundColor: color, transition: "width 1s ease-out" }}
      />
    </div>
  );
}

function HireChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-sm"
            style={{
              height: `${v === 0 ? 3 : (v / max) * 48}px`,
              backgroundColor: color,
              opacity: v === 0 ? 0.12 : 0.8,
            }}
          />
          <span className="text-[9px] text-slate-400">{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  );
}

function DepartmentCard({ dept }: { dept: typeof DEPARTMENTS[0] }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ borderTop: `3px solid ${dept.color}` }}
    >
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">{dept.name}</h3>
          <span className="text-xs text-slate-400">
            {dept.total} из {dept.plan} плановых сотрудников
          </span>
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-bold font-mono"
            style={{
              color:
                dept.staffing >= 95 ? "#059669" : dept.staffing >= 85 ? "#D97706" : "#DC2626",
            }}
          >
            {dept.staffing}%
          </div>
          <div className="text-xs text-slate-400">укомплектованность</div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <ProgressBar value={dept.staffing} color={dept.color} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Ключевые метрики
            </div>
            <div className="space-y-2.5">
              {[
                {
                  label: "Текучесть",
                  value: `${dept.turnover}%`,
                  warn: dept.turnover > 10,
                  amber: dept.turnover > 5 && dept.turnover <= 10,
                },
                { label: "Открытых вакансий", value: String(dept.openVacancies) },
                {
                  label: "Время закрытия",
                  value: dept.avgCloseTime > 0 ? `${dept.avgCloseTime} дн.` : "—",
                },
                {
                  label: "Производительность",
                  value: `${dept.performance}%`,
                  green: dept.performance >= 100,
                  amber: dept.performance < 100,
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span
                    className="text-xs font-semibold font-mono"
                    style={{
                      color: item.warn
                        ? "#DC2626"
                        : item.amber
                        ? "#D97706"
                        : item.green
                        ? "#059669"
                        : "#1E3A5F",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Зарплатный диапазон
            </div>
            <div className="text-center mb-3">
              <div className="text-xl font-bold text-slate-900 font-mono">
                {(dept.avgSalary / 1000).toFixed(0)}к ₽
              </div>
              <div className="text-[10px] text-slate-400">средняя</div>
            </div>
            <div className="relative">
              <div className="h-1.5 bg-slate-100 rounded-full relative overflow-visible">
                <div
                  className="absolute h-full rounded-full"
                  style={{ backgroundColor: dept.color, opacity: 0.2, width: "100%" }}
                />
                <div
                  className="absolute top-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                  style={{
                    backgroundColor: dept.color,
                    left: `${((dept.avgSalary - dept.salaryMin) / (dept.salaryMax - dept.salaryMin)) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] text-slate-400 font-mono">
                  {(dept.salaryMin / 1000).toFixed(0)}к
                </span>
                <span className="text-[9px] text-slate-400 font-mono">
                  {(dept.salaryMax / 1000).toFixed(0)}к
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Найм по месяцам (2025)
          </div>
          <HireChart data={dept.newHires} color={dept.color} />
        </div>

        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
            KPI отдела
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dept.kpi.map((k) => (
              <div key={k.label} className="bg-slate-50 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 mb-1 leading-tight">{k.label}</div>
                <div className="font-bold text-slate-900 text-sm font-mono">
                  {typeof k.value === "number" && k.value > 999
                    ? k.value.toLocaleString("ru-RU")
                    : k.value}{" "}
                  <span className="text-[10px] font-normal text-slate-400">{k.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<"overview" | "departments">("overview");

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
              <Icon name="Users" size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-slate-900 text-sm">HR Analytics</div>
              <div className="text-[10px] text-slate-400">Q2 2025 · 350 сотрудников</div>
            </div>
          </div>

          <nav className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {[
              { key: "overview", label: "Обзор", icon: "LayoutDashboard" },
              { key: "departments", label: "Отделы", icon: "Building2" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key as "overview" | "departments")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  tab === item.key
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Обновлено сегодня
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === "overview" && (
          <div className="space-y-6">
            <div style={{ opacity: 0, animation: "fadeInUp 0.3s ease-out forwards" }}>
              <h1 className="text-2xl font-bold text-slate-900 mb-0.5">
                Обзор HR-показателей
              </h1>
              <p className="text-sm text-slate-400">Апрель 2025 · данные за Q2</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon="Users"
                label="Численность персонала"
                value="350"
                sub="план 380 · дефицит 30 чел."
                delay={60}
              />
              <MetricCard
                icon="TrendingUp"
                label="Текучесть за квартал"
                value="8.2%"
                sub="норма ≤ 5% · превышение +3.2 п.п."
                alert
                delay={120}
              />
              <MetricCard
                icon="Briefcase"
                label="Открытые вакансии"
                value="23"
                sub="из них 7 горящих (>30 дней)"
                delay={180}
              />
              <MetricCard
                icon="Clock"
                label="Среднее время закрытия"
                value="34 дня"
                sub="целевой показатель: 25 дней"
                delay={240}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                style={{ opacity: 0, animation: "fadeInUp 0.4s ease-out 300ms forwards" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="BarChart2" size={17} className="text-blue-700" />
                  <h3 className="font-semibold text-slate-900">Укомплектованность по отделам</h3>
                </div>
                <div className="space-y-5">
                  {DEPARTMENTS.map((d) => (
                    <div key={d.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">{d.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-mono">
                            {d.total}/{d.plan}
                          </span>
                          <span
                            className="text-sm font-bold w-12 text-right font-mono"
                            style={{
                              color:
                                d.staffing >= 95
                                  ? "#059669"
                                  : d.staffing >= 85
                                  ? "#D97706"
                                  : "#DC2626",
                            }}
                          >
                            {d.staffing}%
                          </span>
                        </div>
                      </div>
                      <ProgressBar
                        value={d.staffing}
                        color={
                          d.staffing >= 95 ? "#059669" : d.staffing >= 85 ? "#D97706" : "#DC2626"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="bg-red-50 border border-red-200 rounded-2xl p-5"
                  style={{ opacity: 0, animation: "fadeInUp 0.4s ease-out 380ms forwards" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon name="AlertTriangle" size={17} className="text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-red-700 text-sm mb-1">
                        Критический показатель
                      </div>
                      <div className="text-sm text-red-600 leading-relaxed">
                        Текучесть <strong>8.2%</strong> превышает норму в{" "}
                        <strong>1.6 раза</strong>. Наибольший отток — Разработка:{" "}
                        <strong>14.3%</strong>.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
                  style={{ opacity: 0, animation: "fadeInUp 0.4s ease-out 440ms forwards" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Flame" size={15} className="text-orange-500" />
                    <span className="font-semibold text-slate-900 text-sm">
                      Горящие вакансии (7)
                    </span>
                  </div>
                  <div className="space-y-0">
                    {[
                      { role: "Senior Backend Developer", dept: "Разработка", days: 67 },
                      { role: "Lead Data Engineer", dept: "Разработка", days: 54 },
                      { role: "Head of Sales (регион)", dept: "Продажи", days: 41 },
                      { role: "DevOps Engineer", dept: "Разработка", days: 38 },
                      { role: "Operations Manager", dept: "Операции", days: 35 },
                    ].map((v, i) => (
                      <div
                        key={v.role}
                        className={`flex items-center justify-between py-2.5 ${
                          i < 4 ? "border-b border-slate-100" : ""
                        }`}
                      >
                        <div>
                          <div className="text-xs font-medium text-slate-800">{v.role}</div>
                          <div className="text-[10px] text-slate-400">{v.dept}</div>
                        </div>
                        <span
                          className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                          style={{
                            color: v.days > 50 ? "#DC2626" : "#D97706",
                            backgroundColor: v.days > 50 ? "#FEF2F2" : "#FFFBEB",
                          }}
                        >
                          {v.days}д
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              style={{ opacity: 0, animation: "fadeInUp 0.4s ease-out 500ms forwards" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Activity" size={17} className="text-blue-700" />
                <h3 className="font-semibold text-slate-900">Производительность отделов</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {DEPARTMENTS.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-xl p-4 border border-slate-100"
                    style={{ backgroundColor: `${d.color}08` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-semibold text-slate-800 text-sm">{d.name}</span>
                      <span
                        className="text-sm font-bold font-mono"
                        style={{
                          color: d.performance >= 100 ? "#059669" : "#D97706",
                        }}
                      >
                        {d.performance}%
                      </span>
                    </div>
                    <ProgressBar value={Math.min(d.performance, 100)} color={d.color} />
                    <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                      <span>{d.total} чел.</span>
                      <span
                        style={{ color: d.turnover > 10 ? "#DC2626" : d.turnover > 5 ? "#D97706" : "#059669" }}
                        className="font-medium"
                      >
                        текуч. {d.turnover}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "departments" && (
          <div className="space-y-6">
            <div style={{ opacity: 0, animation: "fadeInUp 0.3s ease-out forwards" }}>
              <h1 className="text-2xl font-bold text-slate-900 mb-0.5">Анализ по отделам</h1>
              <p className="text-sm text-slate-400">
                Детальные метрики · производительность · зарплаты · динамика найма
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {DEPARTMENTS.map((d, i) => (
                <div
                  key={d.id}
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.4s ease-out ${i * 80}ms forwards`,
                  }}
                >
                  <DepartmentCard dept={d} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-5 mt-4 border-t border-slate-200">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>HR Analytics Dashboard · Q2 2025</span>
          <span className="font-mono">350 / 380 сотрудников</span>
        </div>
      </footer>
    </div>
  );
}