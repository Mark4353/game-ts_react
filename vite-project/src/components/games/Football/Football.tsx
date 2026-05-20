import React from 'react'
import './Football.css'
import { useFootball } from '@/utils'

export default function FootballSection(): JSX.Element {
	const { fieldRef, cursor, handlePointerMove, handlePointerLeave, started, startGame } = useFootball()

	return (
		<section className="game-section football-section">
			<h2>Футбол</h2>

			<div className="field-wrap">
				<div
					className={`field ${started ? 'started' : 'not-started'}`}
					ref={fieldRef}
					onPointerMove={handlePointerMove}
					onPointerDown={handlePointerMove}
					onPointerLeave={handlePointerLeave}
				>
					<svg
						className="soccer-ball"
						width="64"
						height="64"
						viewBox="0 0 64 64"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<circle cx="32" cy="32" r="30" fill="#ffffff" stroke="#000" strokeWidth="2" />
					</svg>

					{!started && (
						<div className="football-modal">
							<div className="football-modal-card">
								<h3>Футбол</h3>
								<p>Натисніть кнопку, щоб розпочати гру</p>
								<button className="start-button" onClick={startGame}>Розпочати гру</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}


