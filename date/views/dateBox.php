	<div class="date-box">
		<div class="year">
			<?php echo date("Y", $concert_date); ?>
		</div>
		<div class="non-year-box">
			<div class="week-day">
				<?php echo date("D", $concert_date); ?>
			</div>
			<div class="month">
				<?php echo date("M", $concert_date); ?>
			</div>
			<div class="month-day">
				<?php echo date("d", $concert_date); ?>
			</div>
			<div class="time">
				<?php echo date("g A", $concert_time); ?>
			</div>
		</div>
	</div>
