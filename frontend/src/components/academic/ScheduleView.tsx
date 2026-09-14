import { useState } from 'react';
import { Clock, MapPin, User, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScheduleSlot } from '@/data/mockData';

interface ScheduleViewProps {
  schedule: ScheduleSlot[];
  showTeacher?: boolean;
  showClassGroup?: boolean;
  onSlotClick?: (slot: ScheduleSlot) => void;
}

const DAYS: ScheduleSlot['day'][] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const DAY_SHORT: Record<string, string> = { Segunda: 'Seg', Terça: 'Ter', Quarta: 'Qua', Quinta: 'Qui', Sexta: 'Sex' };

export function ScheduleView({ schedule, showTeacher = true, showClassGroup = false, onSlotClick }: ScheduleViewProps) {
  const todayIdx = Math.max(0, Math.min(4, new Date().getDay() - 1));
  const [selectedDay, setSelectedDay] = useState<ScheduleSlot['day']>(DAYS[todayIdx] || 'Segunda');

  const daySlots = schedule
    .filter(s => s.day === selectedDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  const ongoingSlot = daySlots.find(s => s.status === 'ongoing');
  const nextSlot = daySlots.find(s => s.status === 'upcoming');

  return (
    <div className="space-y-4">
      {/* Selector de dia */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {DAYS.map((day, i) => {
          const isToday = i === todayIdx;
          const isSelected = day === selectedDay;
          const daySchedule = schedule.filter(s => s.day === day);
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs font-medium transition-all min-w-[3.5rem] active:scale-95',
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : isToday
                  ? 'bg-primary/10 text-primary hover:bg-primary/15'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              <span className="text-[10px] uppercase">{DAY_SHORT[day]}</span>
              <span className="font-semibold">{daySchedule.length}</span>
            </button>
          );
        })}
      </div>

      {/* Aula actual / próxima */}
      {ongoingSlot && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary">Agora</p>
            <p className="text-sm font-semibold text-foreground truncate">{ongoingSlot.subject}</p>
            <p className="text-xs text-muted-foreground">{ongoingSlot.room} · {ongoingSlot.time}–{ongoingSlot.endTime}</p>
          </div>
          {nextSlot && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-muted-foreground">Próxima</p>
              <p className="text-xs font-medium text-foreground">{nextSlot.subject}</p>
              <p className="text-[10px] text-muted-foreground">{nextSlot.time}</p>
            </div>
          )}
        </div>
      )}

      {/* Lista de aulas */}
      {daySlots.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">Sem aulas agendadas para {selectedDay}.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {daySlots.map((slot) => {
            const Component: any = onSlotClick ? 'button' : 'div';
            return (
            <Component
              key={slot.id}
              {...(onSlotClick ? { type: 'button', onClick: () => onSlotClick(slot) } : {})}
              className={cn(
                'w-full text-left flex items-center gap-3 rounded-xl border px-4 py-3 transition-all',
                onSlotClick && 'hover:shadow-sm active:scale-[0.997]',
                slot.status === 'ongoing'
                  ? 'border-primary/30 bg-primary/5 shadow-sm'
                  : slot.status === 'completed'
                  ? 'border-border bg-muted/30'
                  : 'border-border bg-card hover:border-primary/10 hover:shadow-sm'
              )}
            >
              {/* Hora */}
              <div className="w-14 shrink-0 text-center">
                <p className={cn('font-heading text-xs font-bold', slot.status === 'completed' ? 'text-muted-foreground' : 'text-foreground')}>
                  {slot.time}
                </p>
                <p className="text-[10px] text-muted-foreground">{slot.endTime}</p>
              </div>

              {/* Divisor */}
              <div className={cn(
                'w-0.5 h-10 rounded-full',
                slot.status === 'ongoing' ? 'bg-primary' : slot.status === 'completed' ? 'bg-muted-foreground/20' : 'bg-border'
              )} />

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={cn(
                    'text-sm font-medium truncate',
                    slot.status === 'completed' ? 'text-muted-foreground' : 'text-foreground'
                  )}>
                    {slot.subject}
                  </p>
                  {slot.tipo === 'extracurricular' && (
                    <Sparkles className="h-3 w-3 text-accent-foreground shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  {showTeacher && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {slot.teacher}
                    </span>
                  )}
                  {showClassGroup && (
                    <span className="text-xs text-muted-foreground">{slot.classGroup}</span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {slot.room}
                  </span>
                </div>
              </div>

              {/* Estado */}
              <div className="shrink-0">
                {slot.status === 'ongoing' && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">A DECORRER</span>
                )}
                {slot.status === 'completed' && (
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Concluída</span>
                )}
                {slot.status === 'upcoming' && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                )}
              </div>
            </Component>
            );
          })}
        </div>
      )}
    </div>
  );
}
