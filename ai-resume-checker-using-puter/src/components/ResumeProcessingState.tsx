import React from 'react'

const ResumeProcessingState = () => {
    return (
        <div
            className={`mt-10 space-y-4 transition-all duration-700 ${isCompleted ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"}`}
        >
            {steps.map((step) => {
                const Icon = step.icon;

                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id && status === 'success';
                const isLastStepFailed = currentStep === step.id && status === 'fail';

                return (
                    <div
                        key={step.id}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition
                ${isActive ? "border-brand-yellow/20 bg-brand-yellow/10" : isCompleted ? "border-green-500/20 bg-green-500/10" : "border-white/10 bg-white/3 opacity-70"}`}
                    >
                        {/* Icon */}
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl
                ${isActive ? "bg-brand-yellow/20 text-brand-yellow" : isCompleted ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-400"}`}
                        >
                            <Icon size={22} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-left">
                            <p className="font-medium text-white">{step.title}</p>
                            <p className="mt-1 text-sm text-gray-400">
                                {step.description}
                            </p>
                        </div>

                        {/* Status Icon */}
                        {isActive ? (
                            <Loader2
                                size={18}
                                className="animate-spin text-brand-yellow"
                            />
                        ) : isCompleted ? (
                            <CheckLine size={18} className="text-green-400" />
                        ) : null}
                    </div>
                );
            })}
        </div>
    )
}

export default ResumeProcessingState