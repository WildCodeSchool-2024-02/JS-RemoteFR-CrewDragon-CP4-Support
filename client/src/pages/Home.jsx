import {
	InformationCircleIcon,
	CheckBadgeIcon,
	BriefcaseIcon,
} from "@heroicons/react/24/solid";

function Home() {
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
					Support Wheels
					<br className="hidden sm:block" />
					Pourquoi faire ?
				</h1>
				<div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
					<div className="p-4 md:w-1/3 flex">
						<div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
							<InformationCircleIcon className="w-6 h-6" />
						</div>
						<div className="flex-grow pl-6">
							<h2 className="text-gray-900 text-lg title-font font-medium mb-2">
								Besoin d'aide ?
							</h2>
							<p className="leading-relaxed text-base">
								Support wheels permet de déposer une demande
								d'aide qui sera vu avec le formateur dans un
								temps défini. Celui ci pourra vous aider à
								répondre à votre problématique.
							</p>
						</div>
					</div>
					<div className="p-4 md:w-1/3 flex">
						<div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
							<BriefcaseIcon className="w-6 h-6" />
						</div>
						<div className="flex-grow pl-6">
							<h2 className="text-gray-900 text-lg title-font font-medium mb-2">
								Temps de support
							</h2>
							<p className="leading-relaxed text-base">
								Le temps de support est un temps défini avec les
								étudiants pour réviser ou revoir une notion non
								comprise. Ce temps permet de répondre à vos
								questions. Et pourquoi pas, de refaire un
								livecoding.
							</p>
						</div>
					</div>
					<div className="p-4 md:w-1/3 flex">
						<div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
							<CheckBadgeIcon className="w-6 h-6" />
						</div>
						<div className="flex-grow pl-6">
							<h2 className="text-gray-900 text-lg title-font font-medium mb-2">
								C'est bon !
							</h2>
							<p className="leading-relaxed text-base">
								Une fois fait, le formateur pourra valider le
								support et celui ci sera clôturé. Vous pourrez
								alors soit reposter une demande, soit continuer
								votre projet.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Home;
