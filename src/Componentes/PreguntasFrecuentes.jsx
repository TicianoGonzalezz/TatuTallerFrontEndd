import React, { useState } from "react";

const faqs = [
	{
		pregunta: "¿Necesito experiencia previa para tomar clases?",
		respuesta:
			"No, nuestras clases están diseñadas para todos los niveles, desde principiantes hasta avanzados.",
	},
	{
		pregunta: "¿Qué materiales están incluidos en las clases?",
		respuesta:
			"Incluimos herramientas básicas y materiales iniciales. El barro y esmaltes pueden adquirirse en el taller.",
	},
	{
		pregunta: "¿Puedo alquilar el horno sin tomar clases?",
		respuesta:
			"Sí, ofrecemos alquiler de horno para piezas externas. Consultá disponibilidad y requisitos.",
	},
];

function PreguntasFrecuentes() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (idx) => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	return (
		<section className="bg-[#f8f1e6] py-12">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-8">
					Preguntas Frecuentes
				</h2>
				{faqs.map((faq, idx) => (
					<div key={idx} className="mb-4 bg-white rounded-lg shadow">
						<button
							className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium focus:outline-none"
							onClick={() => toggle(idx)}
						>
							{faq.pregunta}
							<span className="text-2xl">
								{openIndex === idx ? "×" : "+"}
							</span>
						</button>
						{openIndex === idx && (
							<div className="px-6 pb-4 text-left text-gray-700">
								{faq.respuesta}
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

export default PreguntasFrecuentes;